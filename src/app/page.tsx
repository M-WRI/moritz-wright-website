import { Portfolio } from "@/components/Portfolio";

export const revalidate = 60;

export default async function Home() {
  return <Portfolio />;
}
