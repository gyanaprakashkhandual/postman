pm.test("Status is 201 Created", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has success true", function () {
    const json = pm.response.json();
    pm.expect(json.success).to.be.true;
});

pm.test("Todo is returned with an id", function () {
    const json = pm.response.json();
    pm.expect(json.data).to.have.property("id");
    pm.expect(json.data.id).to.be.a("number");
});

pm.test("Title matches what was sent", function () {
    const json = pm.response.json();
    pm.expect(json.data.title).to.eql("Complete project documentation");
});

pm.test("Default status is PENDING", function () {
    const json = pm.response.json();
    pm.expect(json.data.status).to.eql("PENDING");
});

pm.test("Default priority is MEDIUM if not sent", function () {
    const json = pm.response.json();
    pm.expect(["LOW", "MEDIUM", "HIGH"]).to.include(json.data.priority);
});

// Save the created todo id for use in later requests
pm.environment.set("todoId", pm.response.json().data.id);