import Image from 'next/image'
import Button from './Button'

interface GradFeaturedProps {
  sectionTitle?: string;
  title: string;
  description: string;
  buttonHref: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

export default function GradFeatured({
  sectionTitle,
  title,
  description,
  buttonHref,
  buttonText,
  imageSrc,
  imageAlt,
}: GradFeaturedProps) {
  return (
    <section className="w-full relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#34105e]/100 via-[#34105e]/90 to-transparent z-10" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#34105e]/100 via-[#34105e]/90 to-transparent" />
      <div className="container mx-auto px-4 relative z-30">
        {sectionTitle && (
          <div className="mb-12 pt-12">
            <div className="flex justify-end mb-2">
              <span className="text-sm text-white uppercase tracking-wider">
                {sectionTitle}
              </span>
            </div>
            <div className="border-t border-gray-500 w-full mb-4" />

          </div>
        )}

        <div className="min-h-screen flex items-center">
          <div className="max-w-xl text-left text-white ml-6 md:ml-24">
            <h2 className="text-5xl font-bold text-white text-left uppercase">
              {title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed font-jura mt-4">{description}</p>
            <Button href={buttonHref} text={buttonText} colored={true} />
          </div>
        </div>
      </div>
    </section>
  )
}
