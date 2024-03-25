import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  img_: StaticImageData;
  name_: string;
  id_: string
};

const ArtistsSliderCard = ({ img_, name_, id_ }: Props) => {
  return (
    <div className="swiper-slide trending__item round16 p-8">

      <div className="thumb ralt overhid transition">
        <Image
          src={`/img22/img/profile/${img_}`}
          width={390}
          height={390}
          className="transition h-auto"
          alt="img"
        />
        <div className="artist__popup d-flex align-items-center justify-content-between">
          <div className="content">
            <h5 className="mb-1">
              <Link href={`/artist-allsong?artist=${name_}&artist_id=${id_}`} className="white">
                {name_}
              </Link>
            </h5>
          </div>
          <Link href={`/artist-allsong?artist=${name_}&artist_id=${id_}`} className="cmn__arrow">
            <IconArrowNarrowRight className="arrowrotate" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistsSliderCard;
