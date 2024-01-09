import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Props {
  footerSnsData: {
    id: number;
    name: string;
    url: string;
    img: StaticImageData;
  };
}

export default function Sns({ footerSnsData }: Props) {
  const { name, url, img } = footerSnsData;

  return (
    <>
      <Link href={url} target="_blank">
        <Image width={20} height={20} src={img} alt={name} />
      </Link>
    </>
  );
}
