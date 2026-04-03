pm.test("Status is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success true", function () {
    const json = pm.response.json();
    pm.expect(json.success).to.be.true;
});

pm.test("Data is a page object", function () {
    const json = pm.response.json();
    pm.expect(json.data).to.have.property("content");
    pm.expect(json.data).to.have.property("totalElements");
    pm.expect(json.data).to.have.property("totalPages");
    pm.expect(json.data.content).to.be.an("array");
});

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});