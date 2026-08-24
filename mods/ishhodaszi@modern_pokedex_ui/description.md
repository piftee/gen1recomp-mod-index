# Modern Pokedex UI

Modern Pokedex UI rebuilds Gen I's Pokedex as a useful modern-retro research tool. It keeps Pokemon Red's pixel font, palettes, cries, discovery flags, controls, and native actions while presenting the information in responsive cards inspired by newer games.

The index shows caught progress, menu icons, scrolling, and a live battle-art preview on wide displays. Select opens a discovery-safe search panel that combines translated starting-letter and type filters without revealing unseen species. Each known species opens a conditional research file with INFO, STATS, FAMILY, and MOVES pages. Empty systems stay hidden: a species only receives a page or fact when the merged game data genuinely supplies it.

The FAMILY page uses full battle-front artwork and lets known relatives be selected and opened. The MOVES page combines level-up moves and compatible machines into one browsable list, shows each complete TM/HM number, and opens selectable details for type, power, accuracy, PP, category, priority, and meaningful effect text. Crystal 251's Move Tutors are labelled accurately, and its effect families plus Useful Move Info's curated descriptions are supported without exposing internal identifiers.

Large portraits resolve through the same battle-sprite selection used in combat, Modern Party UI, and Modern PC UI. Unique Menu Icons retain their authored colours, while HGSS Visual Overhaul's padded animated icons are fitted by their visible pixels. Wilds of Kanto follower artwork and animation are resolved through that mod's own compatibility interface. Transparent icon space remains transparent rather than becoming a white or grey square.

Compact 160x144 play and common widescreen aspect ratios have dedicated layouts. Companion mods can add extra pages for real abilities, breeding, habitats, forms, held items, or other data through the provided extension hook.

The regular Options screen includes a dedicated Modern Pokedex submenu for Widescreen, Backdrop, and Colours. The original light presentation and a high-contrast dark theme are available, with type colours kept as restrained accents and Pokemon artwork left undimmed.

The mod changes presentation only. Native Pokedex actions, Area maps, cries, Yellow printing, save data, battle rules, and Pokemon data remain authoritative. It requires `engine_internals` to preserve those controllers while replacing their presentation.
