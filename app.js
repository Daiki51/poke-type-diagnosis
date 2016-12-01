/* global $ */

(function() {
    'use strict';

    // ポケモンのタイプ名
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

    // ポケモンのタイプの相性
    var poketypeEfficacies = [
        [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.0, 1.0, 1.0, 0.5, 1.0],
        [1.0, 0.5, 0.5, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 2.0, 1.0],
        [1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0],
        [1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0],
        [1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 0.5, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 0.5, 1.0],
        [1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0],
        [2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5, 0.5, 0.5, 2.0, 0.0, 1.0, 2.0, 2.0, 0.5],
        [1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 0.0, 2.0],
        [1.0, 2.0, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0],
        [1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0],
        [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.0, 0.5, 1.0],
        [1.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.5, 0.5, 1.0, 0.5, 2.0, 1.0, 1.0, 0.5, 1.0, 2.0, 0.5, 0.5],
        [1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0],
        [0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0],
        [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 0.0],
        [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5],
        [1.0, 0.5, 0.5, 0.5, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0],
        [1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 0.5, 1.0]
    ];
    var pre_selected_poketype = null;

    var $active_poketypes = [];

    var mode = "normal";

    $(".poketype-button").on("click", function(e) {
        var $this = $(this);
        var selected_poketype = parseInt($this.attr("data-poketype"), 10);

        if (pre_selected_poketype == null) {
            // 1つ目のタイプの選択
            pre_selected_poketype = selected_poketype;

            $.each($active_poketypes, function(i, $elem) {
                $elem.removeClass("active");
            });
            $active_poketypes = [$this];

            $resultPoketype.text("").attr("data-poketype", -1);
        }
        else {
            // 2つ目のタイプの選択
            if (pre_selected_poketype == selected_poketype) {
                diagnosePoketype(pre_selected_poketype, null);
            }
            else {
                diagnosePoketype(pre_selected_poketype, selected_poketype);
            }

            pre_selected_poketype = null;

            $active_poketypes.push($this);
        }
        
        $this.addClass("active");
    });

    var $resultPoketype = $("#result-poketype");

    function diagnosePoketype(defenseType1, defenseType2) {
        console.log("diagnose:", poketypeNames[defenseType1], defenseType2 ? poketypeNames[defenseType2] : "");

        var attackType;
        for (attackType = 0; attackType < 18; attackType++) {
            if (computeEfficacy(attackType, defenseType1, defenseType2, mode == "reverse") >= 2) {
                break;
            }
        }
        // console.log(resultPoketype);
        $resultPoketype.text(poketypeNames[attackType]).attr("data-poketype", attackType);
    }

    function computeEfficacy(attackType, defenseType1, defenseType2, isReverse) {
        if (arguments.length < 4) {
            isReverse = false;
        }
        if (arguments.length < 3) {
            defenseType2 = null;
        }
        var efficacy;
        if (!isReverse) {
            efficacy = poketypeEfficacies[attackType][defenseType1];
        }
        else {
            efficacy = reverseEfficacy(poketypeEfficacies[attackType][defenseType1]);
        }
        if (defenseType2 != null) {
            if (!isReverse) {
                efficacy *= poketypeEfficacies[attackType][defenseType2];
            }
            else {
                efficacy *= reverseEfficacy(poketypeEfficacies[attackType][defenseType2]);
            }
        }
        return efficacy;
    }

    function reverseEfficacy(efficacy) {
        switch (efficacy) {
            case 1.0:
                return 1.0;
            case 0.5:
                return 2.0;
            case 2.0:
                return 0.5;
            case 0.0:
                return 2.0;
        }
    }

    var $modeSwitchButton = $("#mode-switch-button");
    var $title = $("#title");

    $modeSwitchButton.on("click", function(e) {
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
