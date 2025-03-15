import BlurText from '~/component/Animation/AnimatedUI/BlurText';

export const AnimatedHomeBanner = () => {
    return (
        <div className="relative h-[500px] bg-cover bg-center"
             style={{ backgroundImage: 'url(\'/img/banner/3.jpg\')' }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Nội dung */}
            <div
                className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-4">
                <BlurText text={'Chào mừng tới Pacific'}
                          animateBy="words"
                          direction={'top'}
                          delay={150}
                          className={'uppercase text-3xl md:text-5xl font-bold mb-4'} />
                <BlurText
                    animateBy="words"
                    text={'Khám phá những địa điểm yêu thích của bạn cùng với chúng tôi.'}
                    delay={180}
                    className={'uppercase text-xl md:text-2xl font-semibold mb-6'} />
                <BlurText
                    animateBy="words"
                    text={'Du lịch đến mọi nơi trên thế giới mà không phải đi lòng vòng.'}
                    delay={200}
                    className={'uppercase text-md md:text-lg max-w-2xl'} />
            </div>
        </div>
    );
};