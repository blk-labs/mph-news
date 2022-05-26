type TopicTagProps = {
  label: string;
};
const TopicTag: React.FunctionComponent<TopicTagProps> = ({ label }) => {
  return (
    <div className="my-4">
      <span className="px-3 py-1 inline uppercase text-xs lg:text-sm text-black bg-[#5BA66E] font-mont font-bold">
        { label }
      </span>
    </div>
  );
};


export default TopicTag;