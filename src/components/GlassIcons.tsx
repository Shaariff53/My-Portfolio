import React from 'react';

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  href?: string;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(28, 50%, 50%), hsl(20, 60%, 40%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
  gold: 'linear-gradient(hsl(28, 36%, 51%), hsl(28, 30%, 40%))',
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) return { background: gradientMapping[color] };
    return { background: color };
  };

  return (
    <div className={`flex gap-10 justify-center overflow-visible ${className || ''}`}>
      {items.map((item, index) => {
        const Wrapper = item.href ? 'a' : 'button';
        const linkProps = item.href
          ? { href: item.href, target: '_blank' as const, rel: 'noreferrer' }
          : { type: 'button' as const };

        return (
          <Wrapper
            key={index}
            aria-label={item.label}
            className={`relative bg-transparent outline-none border-none cursor-none w-[4em] h-[4em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${item.customClass || ''}`}
            {...linkProps}
          >
            <span
              className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] [will-change:transform] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
              style={{
                ...getBackgroundStyle(item.color),
                boxShadow: '0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)',
              }}
            />
            <span
              className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.1)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [will-change:transform] transform group-hover:[transform:translate3d(0,0,2em)]"
              style={{ boxShadow: '0 0 0 0.1em hsla(0, 0%, 100%, 0.2) inset' }}
            >
              <span className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center text-foreground" aria-hidden="true">
                {item.icon}
              </span>
            </span>
            <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-sm text-muted-foreground opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
              {item.label}
            </span>
          </Wrapper>
        );
      })}
    </div>
  );
};

export default GlassIcons;
