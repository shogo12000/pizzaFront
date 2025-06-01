import TopBar from "../components/TopBar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col h-screen">
        <TopBar />
        <div className="flex flex-col gap-5 flex-1 bg-amber-100 justify-center items-center">
          <h1>Welcome Vancouver Pizza</h1>
          <h2
            className="text-pink-400 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Start Here
          </h2>
        </div>
      </div>
    </>
  );
}
