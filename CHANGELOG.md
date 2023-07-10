# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

---

## [0.8.0] - 2023-07-09

### Added

- `watcher.on` callbacks now pass the previous value as the fourth argument.

---

## [0.7.1] - 2023-07-09

### Fixed

- `exports` was malconfigured. This has been fixed.

---

## [0.7.0] - 2023-07-09

### Changed

- state-watcher now natively supports es-modules

### Fixed

- `on` callbacks should only fire when the value changes, not when the value is set to the same value.

---

## [0.6.0] - 2021-03-26

### Added

- state-watcher now comes with type-defs!

### Changed

- `Infinity` callbacks will now call even when a `field` callback is defined.
- `watcher.has` now returns an Array of strings rather than an Iterable.

### Fixed

- `klona` is now marked as an external dependency. This was a mistake in how I had originally configured the bundler and was arguably a poor choice.
