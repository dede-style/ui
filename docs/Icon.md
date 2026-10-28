# Icon

An SVG glyph from `@dede-style/ui/icons`, sized on the element ramp and coloured by `currentColor`. Decorative by default; give `label` only when the icon is the content.

```tsx
import { Icon } from "@dede-style/ui"
```

## Props

| Prop | Values | Default | Description |
|---|---|---|---|
| `glyph` | `Alert` · `AlertFill` · `ArrowDown` · `ArrowLeft` · `ArrowRight` · `ArrowUp` … ([all](https://dede.style/icons)) | `Star` | the icon. In code, import it by its full name: icon plus this (Star is iconStar) |
| `size` | `3` · `4` · `5` · `6` · `8` · `10` · `12` · `text` · `fill` | `6` | a size step (16, 20, 24px…), or text to match the surrounding type, or fill to fill the container |
| `label` | string | — | leave empty for a decorative icon. Set it only when the icon is the content; an icon button takes its name on the button |

Props not listed (handlers, `className`, `style`, `children`) are standard React. Sizes are `--size-element-*` steps: `8` = 32px, `10` = 40px, `12` = 48px.

## Notes

- **Brand marks are `iconLogo<Brand>`**: `iconLogoFacebook`, `iconLogoGithub`, `iconLogoInstagram`, `iconLogoLinkedin`, `iconLogoMeta`, `iconLogoThreads`, `iconLogoTiktok`, `iconLogoWhatsapp`, `iconLogoX`, `iconLogoYoutube`. Each brand’s own guidelines apply on top of the licence.
- **The artwork is Boxicons, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).** A site that shows the icons credits Boxicons where people can see it, such as a footer line or a credits page, linking [boxicons.com](https://boxicons.com) and the licence. The package’s `NOTICE` carries the credit when the files are redistributed.

Live examples: https://dede.style/components/icon

_Generated from the component's schema by `npm run build:docs`._
