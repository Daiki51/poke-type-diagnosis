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
    
    var $active_poketypes = [];

    var mode = "normal";

    $(".poketype-button").on("click", function(e) {
        var $this = $(this);
        var selected_poketype = parseInt($this.attr("data-poketype"));
        
        $this.addClass("active");

        if (pre_selected_poketype != null) {
            if (pre_selected_poketype == selected_poketype) {
                diagnosePoketype(pre_selected_poketype, null);
            }
            else {
                diagnosePoketype(pre_selected_poketype, selected_poketype);
            }
            
            pre_selected_poketype = null;
            
            $active_poketypes.push($this);
        }
        else {
            pre_selected_poketype = selected_poketype;
            
            $.each($active_poketypes, function(i, $elem) {
                $elem.removeClass("active");
            });
            $active_poketypes = [$this];
            
            $resultPoketype.text("").attr("data-poketype", -1);
        }
    });

    var $resultPoketype = $("#result-poketype");

    function diagnosePoketype(type1, type2) {
        console.log("diagnose:", poketypeNames[type1], type2 ? poketypeNames[type2] : "");

        var resultPoketype = null;
        var i, efficacy;
        for (i = 0; i < 18; i++) {
            if (mode == "normal") {
                efficacy = poketypeEfficacy[i][type1];
            } else {
                efficacy = 1 / poketypeEfficacy[i][type1];
            }
            if (type2) {
                if (mode == "normal") {
                    efficacy *= poketypeEfficacy[i][type2];
                } else {
                    efficacy *= 1 / poketypeEfficacy[i][type2];
                }
            }
            if (efficacy >= 2) {
                resultPoketype = i;
                break;
            }
        }
        // console.log(resultPoketype);

        $resultPoketype.text(poketypeNames[resultPoketype]).attr("data-poketype", resultPoketype);

    }

    var $modeSwitchButton = $("#mode-switch-button");
    var $title = $("#title");

    $modeSwitchButton.on("click", function(e) {
        console.log("aaaaa");
        if (mode == "normal") {
            $modeSwitchButton.text($modeSwitchButton.text().replace(/逆さ相性/g, "タイプ相性"));
            $title.text($title.text().replace(/タイプ相性/g, "逆さ相性"));
            mode = "reverse";
        }
        else {
            $modeSwitchButton.text($modeSwitchButton.text().replace(/タイプ相性/g, "逆さ相性"));
            $title.text($title.text().replace(/逆さ相性/g, "タイプ相性"));
            mode = "normal";
        }
        
        // リセット
        $resultPoketype.text("").attr("data-poketype", -1);
        pre_selected_poketype = null;
        $.each($active_poketypes, function(i, $elem) {
            $elem.removeClass("active");
        });
        $active_poketypes = [];
    });
    
    // ヒントをPC向けに変更
    if (!('ontouchstart' in window)) {
        var $hintText = $("#hint-text");
        $hintText.text($hintText.text().replace(/タップ/g, "クリック"))
    }
})();
