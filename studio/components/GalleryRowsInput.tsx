import imageUrlBuilder from "@sanity/image-url";
import {Box, Card, Stack, Text} from "@sanity/ui";
import {useEffect, useMemo, useState} from "react";
import {type ArrayOfObjectsInputProps, useClient} from "sanity";

type CellItem = {
  _key: string;
  colSpan?: number;
  post?: {_ref?: string};
};

type RowItem = {
  _key: string;
  cells?: CellItem[];
};

type PostDoc = {
  _id: string;
  title?: string;
  thumbnail?: {asset?: {_ref?: string}};
};

export function GalleryRowsInput(
  props: ArrayOfObjectsInputProps<RowItem>,
) {
  const {renderDefault, value} = props;
  const client = useClient({apiVersion: "2024-01-01"});
  const builder = useMemo(() => imageUrlBuilder(client), [client]);

  const refIds = useMemo(() => {
    const ids = new Set<string>();
    value?.forEach((row) => {
      row.cells?.forEach((cell) => {
        const ref = cell.post?._ref;
        if (ref) ids.add(ref);
      });
    });
    return [...ids];
  }, [value]);

  const [postsById, setPostsById] = useState<Record<string, PostDoc>>({});

  useEffect(() => {
    if (refIds.length === 0) {
      setPostsById({});
      return;
    }
    let cancelled = false;
    const q = `*[_id in $ids]{ _id, title, thumbnail }`;
    client.fetch<PostDoc[]>(q, {ids: refIds}).then((docs) => {
      if (cancelled) return;
      const next: Record<string, PostDoc> = {};
      docs.forEach((d) => {
        next[d._id] = d;
      });
      setPostsById(next);
    });
    return () => {
      cancelled = true;
    };
  }, [client, refIds.join("|")]);

  return (
    <Stack space={5}>
      {renderDefault(props)}
      <Card padding={4} radius={2} shadow={1} tone="transparent">
        <Text size={1} weight="semibold">
          Gallery preview
        </Text>
        <Text muted size={1}>
          Matches the 5-column layout on the site. Empty cells show a
          placeholder.
        </Text>
        <Stack marginTop={4} space={4}>
          {value?.length ? (
            value.map((row) => (
              <Box key={row._key}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                    gap: 12,
                    alignItems: "stretch",
                  }}
                >
                  {row.cells?.map((cell) => {
                    const span = cell.colSpan ?? 1;
                    const ref = cell.post?._ref;
                    const doc = ref ? postsById[ref] : undefined;
                    const url = doc?.thumbnail?.asset
                      ? builder.image(doc.thumbnail).width(360).height(360).fit("crop").url()
                      : null;
                    return (
                      <div
                        key={cell._key}
                        style={{
                          gridColumn: `span ${span} / span ${span}`,
                          minHeight: 72,
                          borderRadius: 6,
                          overflow: "hidden",
                          background: "var(--card-muted-bg-color, #e8e8e8)",
                          border:
                            "1px solid var(--card-hairline-soft-color, rgba(0,0,0,0.12))",
                        }}
                      >
                        {url ? (
                          <img
                            alt={doc?.title ?? "Thumbnail"}
                            src={url}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              aspectRatio: "1 / 1",
                              display: "block",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              aspectRatio: "1 / 1",
                              background:
                                "linear-gradient(135deg, #f0f0f0, #d8d8d8)",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Box>
            ))
          ) : (
            <Text muted size={1}>
              Add rows to preview the gallery.
            </Text>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
