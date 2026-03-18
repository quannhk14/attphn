import { Metadata } from "next";
import { InteractiveMapClient } from "./interactive-map-client";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Ban do An toan Thuc pham | Ha Noi",
  description:
    "Kham pha ban do tuong tac hien thi trang thai an toan thuc pham cua cac nha hang, quan an tai Ha Noi",
};

export default function MapPage() {
  return <InteractiveMapClient />;
}
