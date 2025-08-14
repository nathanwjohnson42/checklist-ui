import Image from "next/image";

export default function Header() {
  return (
     <div className="h-[200px] font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center sm:p-20 bg-black">
      <h1 className="flex items-center gap-3 font-bold">
         <Image
          src="/rocket.svg"
          alt="rocket icon"
          width={22}
          height={36}
          priority
        />
        <span className="text-skyBlue text-4xl gap-3">Todo</span>
        <span className="text-violetBlue text-4xl">App</span>
      </h1>
    </div>
  );
}
