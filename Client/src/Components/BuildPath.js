const app_name = "carewithbearmax";

exports.buildPath = function buildPath(route) {
	if (process.env.NODE_ENV === "production") {
		return "https://" + app_name + ".com/" + route;
	} else {
        // Not sure which one  it should be
		//return "http://localhost:3000/" + route;
        return "http://localhost:8080/" + route;
	}
};