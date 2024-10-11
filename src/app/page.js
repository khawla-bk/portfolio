import Image from "next/image";
import bg from "../../public/background/home-bg.webp";
import Fireflies from "../components/fireflies/fireflies";
import dynamic from "next/dynamic";

const AvatarViewer = dynamic(() => import('../components/models/model'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Image src={bg} alt="background" fill className="w-full h-full object-cover object-center opacity-25" />
      <Fireflies />
      <div className="w-full h-screen z-10">
      {/* <RenderModel /> */}
      <AvatarViewer />
      </div>
    </main>
  );
}
