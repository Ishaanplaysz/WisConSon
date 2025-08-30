# Git LFS Commands Reference Guide

## Initial Setup
```bash
# Install Git LFS
git lfs install

# Initialize in a new repository
git init
git lfs install
```

## Tracking Files
```bash
# Track specific file types
git lfs track "*.exe"
git lfs track "*.dll"
git lfs track "*.pak"
git lfs track "*.dat"
git lfs track "*.bin"
git lfs track "*.dmg"
git lfs track "*.asar"

# Track entire directories
git lfs track "dist/**"

# Always add .gitattributes after adding new tracking patterns
git add .gitattributes
git commit -m "Update Git LFS tracking"
```

## Basic Commands
```bash
# Check tracked files
git lfs ls-files

# Check the status of LFS files
git lfs status

# Pull LFS files
git lfs pull

# Push LFS files
git lfs push origin main

# Fetch LFS files
git lfs fetch
```

## Migration Commands
```bash
# Convert existing files to LFS
git lfs migrate import --include="*.exe,*.dll,dist/**"

# Clean up after migration
git lfs prune
```

## Common Workflows

### Adding New Files
```bash
# 1. Track the file type (if not already tracked)
git lfs track "*.extension"

# 2. Add .gitattributes
git add .gitattributes
git commit -m "Track new file type with Git LFS"

# 3. Add and commit your files
git add your-file.extension
git commit -m "Add large file"

# 4. Push (both Git and LFS objects)
git push origin main
```

### Cloning a Repository with LFS Files
```bash
# Clone with LFS files
git clone https://github.com/username/repository.git

# If LFS files weren't downloaded
git lfs pull
```

## Troubleshooting

### If files weren't properly uploaded
```bash
# Verify LFS files
git lfs ls-files

# Re-upload LFS files
git lfs push --all origin main
```

### If getting errors about Git LFS not installed
```bash
# Reinstall Git LFS
git lfs install

# Verify installation
git lfs version
```

### Clear LFS cache if having issues
```bash
# Remove local LFS cache
git lfs prune

# Force fresh download of LFS files
git lfs pull --force
```

## Best Practices
1. Always track new file types before adding files
2. Commit .gitattributes first before adding large files
3. Use specific file patterns to avoid tracking unnecessary files
4. Regularly prune old LFS objects to save space
5. Include git lfs pull in your workflow when switching branches
