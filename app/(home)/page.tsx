import Container from "@/components/global/container";
import Header from "@/components/home/header";
import KanbanBoard from "@/components/home/kanban-board";

export default function Home() {
  return (
    <Container>
      <Header />
      <KanbanBoard />
    </Container>
  );
}
