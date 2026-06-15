import json

def load_json(filepath):
    with open(filepath, 'r') as f:
        return json.load(f)

primitives = load_json('tokens/primitives.json')
semantic = load_json('tokens/semantic.json')

md = []

md.append("# Insigneo Design System — Official Documentation")
md.append("\n> **Source of Truth**: This document reflects the exact values defined in our JSON token system. It is designed to be a living, professional reference for both designers and developers.")
md.append("\n---\n")

md.append("## 1. Token Architecture")
md.append("Our design system uses a strict 3-tier token architecture to ensure scalable and maintainable code across iOS, Android, and Web.\n")
md.append("- **Primitives:** The raw foundation (e.g., `#142641`, `16px`). *Never hardcode these in UI components.*\n- **Semantic:** Context-aware aliases (e.g., `color/bg/primary`, `color/text/inverse`). *Always use these for layout and styling.*\n- **Components:** UI-specific overrides (e.g., `button/primary/bg`).\n")
md.append("\n---\n")

md.append("## 2. Color System (Primitives)")
md.append("These are the absolute color values. Use these to configure your theme providers or stylesheets, but **never** use them directly in component code.")

# Brand Colors
md.append("\n### Brand Colors")
md.append("| Token | Value | Description |")
md.append("|---|---|---|")
for k, v in primitives['color']['brand'].items():
    if not k.startswith('$'):
        md.append(f"| `color/brand/{k}` | `{v['$value']}` | {v.get('$description', '')} |")

# Color Scales
scales = ['blue', 'neutral', 'teal', 'gold', 'lime', 'coral', 'amber', 'purple']
for scale in scales:
    md.append(f"\n### {scale.capitalize()} Scale")
    md.append("| Token | Value |")
    md.append("|---|---|")
    for k, v in primitives['color'][scale].items():
        if not k.startswith('$'):
            md.append(f"| `color/{scale}/{k}` | `{v['$value']}` |")

md.append("\n---\n")

md.append("## 3. Semantic Colors (Theming)")
md.append("This is the core of our Dark Mode and theming engine. **Always** use these variables when styling components.")

light_colors = semantic['light']['color']
dark_colors = semantic['dark']['color']

for category, tokens in light_colors.items():
    if category.startswith('$'): continue
    md.append(f"\n### {category.capitalize()}")
    md.append("| Token | Light Mode Value | Dark Mode Value | Description |")
    md.append("|---|---|---|---|")
    
    for token_name, token_data in tokens.items():
        if token_name.startswith('$'): continue
        if isinstance(token_data, dict) and '$value' in token_data:
            light_val = token_data['$value']
            desc = token_data.get('$description', '')
            dark_val = dark_colors.get(category, {}).get(token_name, {}).get('$value', 'N/A')
            md.append(f"| `color/{category}/{token_name}` | `{light_val}` | `{dark_val}` | {desc} |")
        elif isinstance(token_data, dict):
            # Nested like status.success.default
            for sub_name, sub_data in token_data.items():
                if sub_name.startswith('$'): continue
                light_val = sub_data['$value']
                desc = sub_data.get('$description', '')
                dark_val = dark_colors.get(category, {}).get(token_name, {}).get(sub_name, {}).get('$value', 'N/A')
                md.append(f"| `color/{category}/{token_name}/{sub_name}` | `{light_val}` | `{dark_val}` | {desc} |")


md.append("\n---\n")

md.append("## 4. Typography")
md.append("Our typography system uses a single typeface (**Inter**) optimized for mobile readability.\n")

md.append("### Font Family")
for k, v in primitives['font']['family'].items():
    if not k.startswith('$'):
        md.append(f"- **{k.capitalize()}**: `{v['$value']}`")

md.append("\n### Semantic Typography Hierarchy")
md.append("| Token | Family | Size | Weight | Line Height | Letter Spacing |")
md.append("|---|---|---|---|---|---|")

for t_name, t_data in semantic['light']['typography'].items():
    if t_name.startswith('$'): continue
    family = t_data['family']['$value'].replace('{', '').replace('}', '')
    size = t_data['size']['$value'].replace('{', '').replace('}', '')
    weight = t_data['weight']['$value'].replace('{', '').replace('}', '')
    lh = t_data['lineHeight']['$value'].replace('{', '').replace('}', '')
    ls = t_data['letterSpacing']['$value'].replace('{', '').replace('}', '')
    md.append(f"| `{t_name}` | `{family}` | `{size}` | `{weight}` | `{lh}` | `{ls}` |")

md.append("\n---\n")

md.append("## 5. Spacing & Layout")
md.append("We use a strict 4px base-unit spacing scale optimized for mobile touch targets.\n")

md.append("### Spacing Scale")
md.append("| Token | Value |")
md.append("|---|---|")
for k, v in primitives['spacing'].items():
    if not k.startswith('$'):
        md.append(f"| `spacing/{k}` | `{v['$value']}` |")

md.append("\n### Border Radius")
md.append("| Token | Value |")
md.append("|---|---|")
for k, v in primitives['radius'].items():
    if not k.startswith('$'):
        md.append(f"| `radius/{k}` | `{v['$value']}` |")

md.append("\n---\n")

md.append("## 6. Elevation & Shadows")
md.append("| Token | Value | Description |")
md.append("|---|---|---|")
for k, v in primitives['shadow'].items():
    if not k.startswith('$'):
        md.append(f"| `shadow/{k}` | `{v['$value']}` | {v.get('$description', '')} |")

md.append("\n---\n")

md.append("## 7. Developer Implementation")
md.append("### Web (CSS)")
md.append("We provide a compiled `tokens.css` file. It leverages CSS custom properties and handles dark mode out-of-the-box.")
md.append("```css\n/* Usage Example */\n.card {\n  background: var(--color-surface-default);\n  padding: var(--spacing-4);\n  border-radius: var(--radius-md);\n}\n```")

md.append("### iOS / Android (Native)")
md.append("The JSON token files in the `tokens/` directory adhere to the W3C DTCG specification. Use **Style Dictionary** to automatically generate your `Color.xcassets`, Swift UI Colors, `colors.xml`, and Compose Objects.")
md.append("```bash\n# Example Style Dictionary compilation\nstyle-dictionary build\n```")


with open('Insigneo_Design_System_Documentation.md', 'w') as f:
    f.write('\n'.join(md))

print("Documentation generated!")
