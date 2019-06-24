import PropTypes from 'prop-types';
import Span from './Span';

const COMPLETED_CHAR = '▓';
const INCOMPLETE_CHAR = '░';

// https://api.slack.com/reference/messaging/composition-objects#text
export default class ProgressBar extends Span {
  static propTypes = {
    color: PropTypes.oneOf(['red', 'black']),
    total: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    columnWidth: PropTypes.number,
  };

  static defaultProps = {
    color: 'black',
    columnWidth: 5,
  };

  constructor(root, props) {
    super(root, { ...ProgressBar.defaultProps, ...props });
  }

  render() {
    const { color, total, value, columnWidth } = this.props;
    const completedCount = Math.ceil((value / total) * columnWidth);
    const incompleteCount = columnWidth - completedCount;
    const segments =
      COMPLETED_CHAR.repeat(completedCount) +
      INCOMPLETE_CHAR.repeat(incompleteCount);

    return color === 'red' ? `\`${segments}\`` : segments;
  }
}
