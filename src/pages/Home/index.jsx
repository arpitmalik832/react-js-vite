/**
 * Home Page.
 * @file This file is saved as `Home/index.jsx`.
 */
import {
  useBackPress,
  Button,
} from '@arpitmalik832/react-js-rollup-monorepo-library';

import ButtonV2 from '../../components/atoms/Button';
import { ReactComponent as ReactIcon } from '../../assets/icons/react.svg';

/**
 * Home component renders the home page with buttons.
 * @returns {import('react').JSX.Element} The rendered component.
 * @example
 * <Home />
 */
function Home() {
  useBackPress();

  return (
    <div>
      Home
      <Button />
      <ButtonV2 />
      <ReactIcon />
    </div>
  );
}

export default Home;
