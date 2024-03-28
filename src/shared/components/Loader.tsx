import { BeatLoader } from 'react-spinners';
import { BASE_COLORS } from '../constants';

export default function Loader() {
  return <BeatLoader color={BASE_COLORS.DEFAULT_BLUE} />;
}
