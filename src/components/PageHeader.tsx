interface PageHeaderProps {
  title: React.ReactNode;
  subTitle?: string;
}

const PageHeader = ({ title, subTitle }: PageHeaderProps) => {
  return (
    <section className="text-center space-y-3">
      <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>

      {subTitle && (
        <p className="text-gray-400 max-w-2xl mx-auto">{subTitle}</p>
      )}
    </section>
  );
};

export default PageHeader;
