/* global $ */

(function() {
    var poketypeNames = [
        "ノーマル",
        "ほのお",
        "みず",
        "でんき",
        "くさ",
        "こおり",
        "かくとう",
        "どく",
        "じめん",
        "ひこう",
        "エスパー",
        "むし",
        "いわ",
        "ゴースト",
        "ドラゴン",
        "あく",
        "はがね",
        "フェアリー"
    ];

    var poketypeEfficacy = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1, 1],
        [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1],
        [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1],
        [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1],
        [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1],
        [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1],
        [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5],
        [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2],
        [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1],
        [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1],
        [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1],
        [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5],
        [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0],
        [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5],
        [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2],
        [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1]
    ];
    var pre_selected_poketype = null;
    var $pre_selected_poketype = null;

    $(".poketype-button").on("click", function(e) {
        var selected_poketype = parseInt($(this).attr("data-poketype"));
        // console.log("clicked:", selected_poketype);
        
        if (pre_selected_poketype != null) {
            if (pre_selected_poketype == selected_poketype) {
                diagnosePoketype(pre_selected_poketype, null);
            }
            else {
                diagnosePoketype(pre_selected_poketype, selected_poketype);
            }
            $pre_selected_poketype.removeClass("selected");
            pre_selected_poketype = $pre_selected_poketype = null;
        }
        else {
            pre_selected_poketype = selected_poketype;
            $pre_selected_poketype = $(this);
            $pre_selected_poketype.addClass("selected");
        }
    });
    
    var $resultPoketype = $("#result-poketype");

    function diagnosePoketype(type1, type2) {
        console.log("diagnose:", poketypeNames[type1], type2 ? poketypeNames[type2] : "");
        
        var resultPoketype = null;
        var i, efficacy;
        for (i = 0; i < 18; i++) {
            efficacy = poketypeEfficacy[i][type1];
            if (type2) {
                efficacy *= poketypeEfficacy[i][type2];
            }
            if (efficacy >= 2) {
                resultPoketype = i;
                break;
            }
        }
        // console.log(resultPoketype);
        
        $resultPoketype.text(poketypeNames[resultPoketype]).attr("data-poketype", resultPoketype);
        
    }
})();
