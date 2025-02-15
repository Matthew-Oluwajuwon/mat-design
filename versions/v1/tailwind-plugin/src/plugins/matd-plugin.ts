import { colors, spacing, typography } from '@mat-design/tokens';
import plugin from 'tailwindcss/plugin';

// ✅ Resolve system spacing references dynamically
const resolvedSpacing = Object.fromEntries(
  Object.entries(spacing).map(([key, value]) => {
    if (typeof value === 'string' && value.startsWith('{Spacing.')) {
      const refKey = value.replace('{Spacing.', '').replace('}', ''); // Extract key (e.g., "4")
      const resolvedKey = `spacing-${refKey}` as keyof typeof spacing; // TypeScript assertion

      return [
        key.replace(/\s+/g, '-').toLowerCase(),
        spacing[resolvedKey] ?? value, // Use resolved key or fallback
      ];
    }
    return [key.replace(/\s+/g, '-').toLowerCase(), value]; // Format class names
  })
);

// ✅ Resolve typography values (like fontSize.2) into actual values
const resolvedTypography = Object.fromEntries(
  Object.entries(typography).map(([key, value]) => {
    // Check if value references a fontSize token
    if (typeof value === 'string' && value.startsWith('{fontSize.')) {
      const refKey = value.replace('{fontSize.', '').replace('}', ''); // Extract key (e.g., "2")
      const resolvedKey = `fontSize-${refKey}` as keyof typeof typography; // TypeScript assertion

      // Resolve the token value from fontSize, or fallback to the original string
      value = typography[resolvedKey] ?? value; // Resolve the value or use the original token string
    }

    // Similar checks can be added for other tokens like lineHeight, letterSpacing, fontWeight

    return [key, value]; // Return the resolved key-value pair
  })
);

// ✅ Resolve color values (like Color.grey.2) into actual values
const resolvedColor = Object.fromEntries(
  Object.entries(colors).map(([key, value]) => {
    // Check if value references a fontSize token
    if (typeof value === 'string' && value.startsWith('{fontSize.')) {
      const refKey = value.replace('{fontSize.', '').replace('}', ''); // Extract key (e.g., "2")
      const resolvedKey = `fontSize-${refKey}` as keyof typeof typography; // TypeScript assertion

      // Resolve the token value from fontSize, or fallback to the original string
      value = typography[resolvedKey] ?? value; // Resolve the value or use the original token string
    }

    // Check if value references a color token
    if (typeof value === 'string' && value.startsWith('{Color.')) {
      const refKey = value.replace('{Color.', '').replace('}', ''); // Extract color reference (e.g., "Yellow.Yellow-500")
      const resolvedKey = `Color.${refKey}` as keyof typeof colors; // TypeScript assertion

      // Resolve the color token value or fallback to the original string
      value = colors[resolvedKey] ?? value; // Resolve the value or use the original token string
    }

    return [key, value]; // Return the resolved key-value pair
  })
);

const tailwindPlugin = plugin(
  ({ addBase, addComponents, addUtilities, theme }) => {
    // ✅ Generate dynamic color utilities
    const colorUtilities = Object.fromEntries(
      Object.entries(resolvedColor).map(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('#')) {
          // Ensure color values are valid hex (or any other color format you're using)
          return [`.text-${key}`, { color: value }];
        }

        // If the value is still unresolved, you might want to log the issue
        // console.warn(`Unresolved color: ${key} => ${value}`);
        return [];
      })
    );

    const bgUtilities = Object.fromEntries(
      Object.entries(resolvedColor).map(([key, value]) => {
        // If the value is a color token (like `{Color.Yellow.Yellow-500}`), resolve it
        if (typeof value === 'string' && value.startsWith('{Color.')) {
          const refKey = value.replace('{Color.', '').replace('}', ''); // Extract color reference (e.g., "Yellow.Yellow-500")
          const resolvedKey = `Color.${refKey}` as keyof typeof colors; // TypeScript assertion
    
          // Resolve the color value from the `colors` object or fallback to the original token string
          value = colors[resolvedKey] ?? value; // Resolve the value or use the original token string
    
          // if (value === resolvedKey) {
          //   console.log(`Unresolved color: ${key} => ${resolvedKey}`);
          // }
        }
    
        return [
          `.bg-${key}`,
          { backgroundColor: value }, // Apply resolved color as background color
        ];
      })
    );
    

    const borderUtilities = Object.fromEntries(
      Object.entries(colors).flatMap(([key, value]) => [
        [`.border-${key}`, { borderColor: value }],
        [`.outline-${key}`, { outlineColor: value }],
      ])
    );

    // ✅ Generate dynamic spacing utilities with resolved system tokens
    const spacingUtilities = Object.fromEntries(
      Object.entries(resolvedSpacing).flatMap(([key, value]) => [
        [`.p-${key}`, { padding: value }],
        [`.px-${key}`, { paddingLeft: value, paddingRight: value }],
        [`.py-${key}`, { paddingTop: value, paddingBottom: value }],
        [`.m-${key}`, { margin: value }],
        [`.mx-${key}`, { marginLeft: value, marginRight: value }],
        [`.my-${key}`, { marginTop: value, marginBottom: value }],
        [`.gap-${key}`, { gap: value }],
        [`.rounded-${key}`, { borderRadius: value }],
      ])
    );

    // ✅ Generate typography utilities using the resolved typography values
    const typographyUtilities = Object.fromEntries(
      Object.entries(resolvedTypography).flatMap(([key, value]) => {
        return [
          [`.text-${key}`, { fontSize: value, lineHeight: value[1] }],
          [`.leading-${key}`, { lineHeight: value[1] }],
          [`.tracking-${key}`, { letterSpacing: value[2] }],
          [`.font-${key}`, { fontWeight: value[3] }],
        ];
      })
    );

    // ✅ Generate border width utilities
    const ringWidthUtilities = Object.fromEntries(
      Object.entries(resolvedSpacing).flatMap(([key, value]) => [
        // Generate ring classes with dynamic colors
        [
          `.ring-${key}`,
          {
            boxShadow: `0 0 0 ${value} rgba(0, 0, 0, 0.1)`,
          },
        ],
        // Generate color-specific ring utilities
        ...Object.entries(colors).map(([colorKey, colorValue]) => [
          `.ring-${colorKey}-${key}`,
          { boxShadow: `0 0 0 ${value} ${colorValue}` },
        ]),
        [`.border-${key}`, { borderWidth: value }], // For regular borders
      ])
    );

    // ✅ Generate shadow utilities
    const shadowUtilities = {
      '.shadow-sm': { boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' },
      '.shadow-md': { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
      '.shadow-lg': { boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' },
      '.shadow-xl': { boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)' },
    };

    // ✅ Generate opacity utilities
    const opacityUtilities = {
      '.opacity-0': { opacity: '0' },
      '.opacity-25': { opacity: '0.25' },
      '.opacity-50': { opacity: '0.5' },
      '.opacity-75': { opacity: '0.75' },
      '.opacity-100': { opacity: '1' },
    };

    // ✅ Generate z-index utilities
    const zIndexUtilities = {
      '.z-0': { zIndex: '0' },
      '.z-10': { zIndex: '10' },
      '.z-20': { zIndex: '20' },
      '.z-30': { zIndex: '30' },
      '.z-40': { zIndex: '40' },
      '.z-50': { zIndex: '50' },
    };

    // ✅ Add base typography styles
    addBase({
      body: {
        fontFamily: theme('fontFamily.inter'),
        fontSize: theme('fontSize.base'),
        color: theme(
          'colors.text-primary',
          colors['color-primary-primary-500']
        ),
      },
      h1: { fontSize: theme('fontSize.2xl') },
      h2: { fontSize: theme('fontSize.xl') },
      h3: { fontSize: theme('fontSize.lg') },
    });

    // ✅ Define reusable component styles
    addComponents({
      '.btn': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: theme('fontSize.base'),
        padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
        borderRadius: theme('borderRadius.md'),
        transition: 'all 0.2s ease-in-out',
        fontWeight: 'bold',

        '&.btn-primary': {
          backgroundColor: theme('colors.primary'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.primary-dark'),
          },
        },
        '&.btn-secondary': {
          backgroundColor: theme('colors.secondary'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.secondary-dark'),
          },
        },
      },
    });

    // ✅ Add generated utilities
    addUtilities({
      ...colorUtilities,
      ...bgUtilities,
      ...spacingUtilities,
      ...typographyUtilities,
      ...borderUtilities,
      ...ringWidthUtilities,
      ...shadowUtilities,
      ...opacityUtilities,
      ...zIndexUtilities,
    });
  }
);

export default tailwindPlugin;
