# Ish's Gen1Recomp Mods

A personal install feed for [Ish's Gen1Recomp mods](https://github.com/piftee?tab=repositories&q=gen1recomp).
The catalogue contains metadata only. Each mod remains in its own source
repository and is installed from its published GitHub release.

## Add the index in Gen1Recomp

1. Open **Mods → Find Mods** in the Gen1Recomp launcher.
2. Add this index source:

   ```text
   piftee/gen1recomp-mod-index
   ```

3. Refresh the list, choose a mod, and install it.

The machine-readable feed is published at:

```text
https://piftee.github.io/gen1recomp-mod-index/data/index.json
```

## Included mods

- [Battle Info HUD](https://github.com/piftee/gen1recomp-battle-info-hud)
- [Modern Bag UI](https://github.com/piftee/gen1recomp-modern-bag-ui)
- [Modern Party UI](https://github.com/piftee/gen1recomp-modern-party-ui)
- [Modern PC UI](https://github.com/piftee/gen1recomp-modern-pc-ui)
- [Modern Pokedex UI](https://github.com/piftee/gen1recomp-modern-pokedex-ui)
- [Typed Move Colors](https://github.com/piftee/gen1recomp-typed-move-colors)

## How it stays current

The Pages workflow rebuilds the feed nightly. For every entry with a `github`
field, it reads that repository's Releases and selects the newest installable
`.zip`, using the same rules as the Gen1Recomp launcher. Publishing a new mod
release therefore updates this index without a manual version-bump commit.

Source entries live under `mods/ishhodaszi@<mod-id>/`. Validate or rebuild the
feed locally with:

```sh
node scripts/validate.mjs
node scripts/check-links.mjs
node scripts/build-index.mjs --releases
```

The index format and publishing tools are derived from the
[Gen1Recomp community mod index](https://github.com/bryanthaboi/gen1recomp-mod-index).
Listing a mod is not a security review; players should inspect source and
declared permissions before enabling it.
