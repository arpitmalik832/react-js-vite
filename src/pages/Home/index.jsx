import Button from '../../components/atoms/Button';
import useBackPress from '../../hooks/useBackPress';

const Home = () => {
  useBackPress();

  return (
    <div>
      Home
      <Button />
    </div>
  );
};

export default Home;
