import { useParams, Link } from "react-router-dom";
import { cards } from "@/data/cards";
import { ArrowLeft } from "lucide-react";

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const card = cards.find((c) => c.slug === slug);

  if (!card) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Страница не найдена</h1>
          <Link to="/" className="text-primary hover:underline">← На главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Назад
      </Link>
      <h1 className="text-4xl font-black text-foreground mb-3">{card.title}</h1>
      {card.description && <p className="text-lg text-muted-foreground mb-8">{card.description}</p>}
      <div className="rounded-2xl p-10 text-primary-foreground text-center" style={card.bgColor?.startsWith("linear") ? { background: card.bgColor } : { backgroundColor: card.bgColor || "hsl(240,20%,12%)" }}>
        <p className="text-xl font-semibold">Контент проекта скоро появится</p>
      </div>
    </div>
  );
};

export default ProjectPage;
