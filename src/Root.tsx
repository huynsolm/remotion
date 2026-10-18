import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import propsData from "../props.json";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={540} // 18초 (씬당 6초씩 총 540프레임)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: propsData.titleText ?? "우리집 가족 앱",
          titleColor: "#000000",
          captions: propsData.captions ?? [],
          captions2: propsData.captions2 ?? [],
          captions3: propsData.captions3 ?? [],
        }}
      />
    </>
  );
};