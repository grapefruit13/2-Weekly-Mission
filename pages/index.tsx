import Image from 'next/image';
import IMGS from '@/constants/importImg';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <div className='logo'>
            <Link href='/'>
              <Image src={IMGS.logo.src} alt={IMGS.logo.alt} />
            </Link>
          </div>
          <Link href='/signin'>
            <button className='login-button button'>로그인</button>
          </Link>
        </nav>
      </header>

      <main>
        <article className='main-article'>
          <div className='main-text'>
            <span>
              <span className='text-highlight'>세상의 모든 정보</span>를<br />
              쉽게 저장하고 관리해 보세요
            </span>
          </div>
          <button className='link-add-button button'>링크 추가하기</button>
          <div className='article-img_container'>
            <Image src={IMGS.s1.src} alt={IMGS.s1.alt} objectFit='cover' />
          </div>
        </article>

        <section className='section2 flex-center'>
          <div className='container'>
            <div className='sub-text'>
              <span>
                <span className='text-highlight'>원하는 링크</span>를 저장하세요
              </span>
              <p>
                나중에 읽고 싶은 글, 다시 보고 싶은 영상, 사고 싶은 옷, 기억하고
                싶은 모든 것을 한 공간에 저장하세요.
              </p>
            </div>
            <div className='sub-img'>
              <Image src={IMGS.s2.src} alt={IMGS.s2.alt} objectFit='cover' />
            </div>
          </div>
        </section>

        <section className='section3 flex-center'>
          <div className='container'>
            <div className='sub-img'>
              <Image src={IMGS.s3.src} alt={IMGS.s3.alt} objectFit='cover' />
            </div>
            <div className='sub-text'>
              <span>
                링크를 폴더로
                <span className='text-highlight'>관리</span>하세요
              </span>
              <p>
                나만의 폴더를 무제한으로 만들고 다양하게 활용할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className='section4 flex-center'>
          <div className='container'>
            <div className='sub-text'>
              <span>
                저장한 링크를
                <span className='text-highlight'>공유</span>해보세요
              </span>
              <p>
                나만의 폴더를 무제한으로 만들고 다양하게 활용할 수 있습니다.
              </p>
            </div>
            <div className='sub-img'>
              <Image src={IMGS.s4.src} alt={IMGS.s4.alt} objectFit='cover' />
            </div>
          </div>
        </section>

        <section className='section5 flex-center'>
          <div className='container'>
            <div className='sub-img'>
              <Image src={IMGS.s5.src} alt={IMGS.s5.alt} objectFit='cover' />
            </div>
            <div className='sub-text'>
              <span>
                저장한 링크를
                <span className='text-highlight'>검색</span>해 보세요
              </span>
              <p>중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
