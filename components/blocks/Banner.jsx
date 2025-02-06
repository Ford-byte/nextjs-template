import Image from "next/image";

export default function Banner(props) {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        {props?.image ? (
          <picture>
            <source media="(max-width: 600px)" srcSet={props?.mobile_image} />
            <source media="(max-width: 1023px)" srcSet={props?.mobile_image} />
            <Image
              src={props?.image}
              fill
              style={{ objectFit: "cover" }}
              alt="Background"
              className="object-cover"
            />
          </picture>
        ) : (
          <Image
            src="/images/not_found.png"
            layout="fill"
            objectFit="contain"
            alt="Background"
            className="object-contain"
          />
        )}
      </div>

      <div className="container text-[18px]">
        {props?.header && (
          <h2 className="font-bold text-7xl max-w-[900px]">
            {props?.header || "Header"}
          </h2>
        )}

        <div className="space-x-[12px] pt-[36px]">
          {props?.buttons?.button1 && (
            <span className="primary-button pointer">
              {props?.buttons?.button1}
            </span>
          )}

          {props?.buttons?.button2 && (
            <span className="tertiary-button pointer">
              {props?.buttons?.button2}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
