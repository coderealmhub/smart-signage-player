import { TVPlayer, useTVPlayerStore, TVPlayerButtonProps } from "./lib";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./App.css";
import { useEffect, useState } from "react";

// locally testing built library
//import { TVPlayer, useTVPlayerStore, TVPlayerButtonProps } from "./..";

export type MediaType = {
  url: string | string[] | MediaStream;
  title?: string;
  subTitle?: string;
  preview?: string | boolean;
};

function App() {
  const actions = useTVPlayerStore((s) => s.actions);
  const mediaIndex = useTVPlayerStore((s) => s.mediaIndex) || 0;
  const likeToggle = useTVPlayerStore((s) => s.likeToggle);
  const [mediaList, setMediaList] = useState<MediaType[]>([]);

  useEffect(() => {
    async function fetchMediaList() {
      try {
        const response = await fetch("https://raw.githubusercontent.com/coderealmhub/smart-signage-data/main/demo.json");
        const data = await response.json();
        setMediaList(data);
      } catch (error) {
        console.error("Erro ao buscar a lista de mídias:", error);
      }
    }
  
    fetchMediaList();
  }, []);

  const customButtons: TVPlayerButtonProps[] = [
    { action: "loop", align: "left" },
    { action: "like", align: "left" },
    { action: "previous", align: "center" },
    { action: "playpause", align: "center" },
    { action: "next", align: "center" },
    { action: "mute", align: "right" },
    {
      action: "custom",
      align: "right",
      label: "About",
      faIcon: faGithub,
      onPress: () => {
        window.location.href = "https://github.com/lewhunt/react-tv-player";
      },
    },
  ];

  const handleLike = () => {
    console.log("like button pressed");
    // custom app logic for like
    actions.setLikeToggle(!likeToggle);
  };

  return (
    <>
      {mediaList.length > 0 && (
        <TVPlayer
          title={mediaList[mediaIndex].title}
          subTitle={mediaList[mediaIndex].subTitle}
          url={mediaList[mediaIndex].url}
          light={mediaList[mediaIndex].preview}
          customButtons={customButtons}
          mediaCount={mediaList.length}
          mediaIndex={mediaIndex}
          onLikePress={handleLike}
          playsinline={true}
          hideControlsOnArrowUp={true}
        />
      )}
    </>
  );
  
}

export default App;
