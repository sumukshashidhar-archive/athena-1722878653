app.post("/addCat", function (req, res) {
    var catId = generate(6);
    var catName = "Adventerous Journey";

    var subCatNameArray = ["Nature", "Historic", "Investigation", "Survival"];
    var subCat = new Array();

    for (var i = 0; i < subCatNameArray.length; i++) {
        var subCatObj = {
            subCatId: parseInt(generate(10)),
            subCatName: subCatNameArray[i]
        };

        subCat.push(subCatObj);
    }

    var cat = new CatE({
        catId: catId,
        catName: catName,
        subCat: subCat
    });

    cat.save(function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            /*console.log(obj)*/
            res.redirect(
                "file:///C:/Users/Dell/Documents/main/athena-pvt/addCat.html"
            );
        }
    });
});