/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Weight, Rocket, PaintBucket } from 'lucide-react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: ReactNode;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Core Features',
    Svg: <Weight style={{ marginTop: 100 }} size={60} />,
    description: (
      <div className={styles.featureItem}>
        The Carousel is a <strong>lightweight</strong>,{' '}
        <strong>dependency-free</strong> component with{' '}
        <strong>TypeScript</strong> support. It&apos;s{' '}
        <strong>Tailwind CSS</strong> compatible and offers{' '}
        <strong>responsive</strong> design for various devices.
      </div>
    ),
  },
  {
    title: 'User Interaction',
    Svg: <Rocket style={{ marginTop: 100 }} size={60} />,
    description: (
      <div className={styles.featureItem}>
        This carousel handles touch and mouse events smoothly and implements{' '}
        <strong>lazy image loading</strong> for optimized performance across
        different devices.
      </div>
    ),
  },
  {
    title: 'Customization',
    Svg: <PaintBucket style={{ marginTop: 100 }} size={60} />,
    description: (
      <div className={styles.featureItem}>
        Easy to integrate with Tailwind or non-Tailwind projects, this{' '}
        <strong>headless styles</strong> allows for custom styling while
        maintaining core functionality.
      </div>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">{Svg}</div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
