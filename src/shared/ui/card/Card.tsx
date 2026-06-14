import Image from 'next/image';

import { CleanCardItem } from './types';

interface CardProps {
  data: CleanCardItem;
}

export function CharacterCard({ data }: CardProps) {
  return (
    <div className="border border-zinc-800 bg-zinc-900/50 rounded-xl overflow-hidden backdrop-blur-sm p-4 flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-800">
        <Image
          width={200}
          height={150}
          src={data.imageUrl}
          alt={data.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <span
          className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
            data.badge === 'Alive'
              ? 'bg-emerald-500/20 text-emerald-400'
              : data.badge === 'Dead'
                ? 'bg-rose-500/20 text-rose-400'
                : 'bg-zinc-500/20 text-zinc-400'
          }`}
        >
          {data.badge}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-lg text-zinc-100 truncate">{data.title}</h3>
        <p className="text-sm text-zinc-400 truncate">Species: {data.description}</p>
      </div>
    </div>
  );
}
