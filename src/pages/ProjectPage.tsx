import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-background px-6 py-10 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Назад
      </Link>
      <h1 className="text-4xl font-black text-foreground mb-3">Проект: {slug}</h1>
      <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: "hsl(240,20%,12%)", color: "white" }}>
        <p className="text-xl font-semibold">Контент проекта скоро появится</p>
      </div>
    </div>
  );
};

export default ProjectPage;
