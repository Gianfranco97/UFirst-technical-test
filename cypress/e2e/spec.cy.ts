describe("empty spec", () => {
  it("Basic data validations", () => {
    cy.visit("http://localhost:3000/");

    cy.get(
      ":nth-child(1) > .ant-statistic > .ant-statistic-content > .ant-statistic-content-value > .ant-statistic-content-value-int"
    ).contains("47,742");

    cy.get(
      ":nth-child(2) > .ant-statistic > .ant-statistic-content > .ant-statistic-content-value > .ant-statistic-content-value-int"
    ).contains("34");

    cy.get(
      ":nth-child(3) > .ant-statistic > .ant-statistic-content > .ant-statistic-content-value > .ant-statistic-content-value-int"
    ).contains("6");
  });
});
