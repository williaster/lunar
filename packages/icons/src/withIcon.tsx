import React from 'react';

export type WithIconWrapperProps = {
  accessibilityLabel?: string;
  decorative?: boolean;
  size?: number | string;
  color?: string;
  inline?: boolean;
};

export type Props = {
  focusable: string;
  role: string;
  style: React.CSSProperties;
};

export default function withIcon(
  name: string,
): (WrappedComponent: React.ComponentType<Props>) => React.ComponentType<WithIconWrapperProps> {
  return WrappedComponent =>
    class Icon extends React.Component<WithIconWrapperProps> {
      static displayName = name;

      static WrappedComponent = WrappedComponent;

      static defaultProps = {
        color: 'currentColor',
        inline: false,
        size: '1em',
      };

      render() {
        const { accessibilityLabel, decorative, color, size, inline } = this.props;
        const props: any = {
          focusable: 'false',
          role: decorative ? 'presentation' : 'img',
          style: {
            height: size,
            width: size,
            display: inline ? 'inline' : 'block',
            fill: color,
          },
        };

        if (__DEV__) {
          if (accessibilityLabel && decorative) {
            // eslint-disable-next-line no-console
            console.error('Only one of `accessibilityLabel` or `decorative` may be used.');
          }
        }

        if (decorative) {
          props['aria-hidden'] = true;
        }

        if (accessibilityLabel) {
          props['aria-label'] = accessibilityLabel;
        }

        return <WrappedComponent {...props} />;
      }
    };
}
