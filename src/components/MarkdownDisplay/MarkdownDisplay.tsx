import Markdown from 'markdown-to-jsx';
import { useMemo } from 'react';
import { overrides } from './Overrides';

interface Props {
  children: string;
}

const MarkdownDisplay: React.FC<Props> = ({ children }) => {
  const parsedChildren = useMemo(() => {
    // Replace all new lines with actual new line
    return children.replaceAll('\\n', '\n');
  }, [children]);

  return (
    <Markdown
      options={{
        overrides,
      }}
    >
      {parsedChildren}
    </Markdown>
  );
};

export default MarkdownDisplay;
