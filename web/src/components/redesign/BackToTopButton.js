const onClickSeeAll = () => {
  document.getElementById("selected-property-types")?.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    setShowReserveHomeForm(false);
    setSelectedPropertyType(null);
  }, 250);
};

export const BackToTopButton = () => {
  returrn(
    <>
      <button
        onClick={onClickSeeAll}
        className="border-b border-dashed mt-9 text-mobile-body md:text-desktop-body"
      >
        Back to top
      </button>
      ↑
    </>
  );
};
