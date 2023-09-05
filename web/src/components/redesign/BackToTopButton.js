export const BackToTopButton = () => {
  const onClickSeeAll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <button
        onClick={onClickSeeAll}
        className="border-b-[2px] border-solid mt-9 text-mobile-body md:text-desktop-body"
      >
        Back to top ↑
      </button>
    </div>
  );
};
