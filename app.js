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

    // 逆さ相性診断かどうか
    var isReverse = false;

    // 1回目に選択されたポケモンのタイプ
    var pre_selected_poketype = null;

    // 選択されたポケモンのタイプを表すボタンのDOMリスト
    var $selected_poketypes = [];

    // 診断結果を表示するDOM
    var $resultPoketype = $("#result-poketype");
    
    // 相性診断と逆さ診断を切り替えるボタンのDOM
    var $modeSwitchButton = $("#mode-switch-button");
    
    // タイトルのDOM
    var $title = $("#title");

    // ヒントをPC向けに変更
    if (!('ontouchstart' in window)) {
        var $hintText = $("#hint-text");
        $hintText.text($hintText.text().replace(/タップ/g, "クリック"));
    }

    $(".poketype-button").on("click", function(e) {
        var $this = $(this);
        var selected_poketype = parseInt($this.attr("data-poketype"), 10);

        if (pre_selected_poketype == null) {
            // 1つ目のタイプの選択
            pre_selected_poketype = selected_poketype;
            // リセット
            clearSelectedType();
            clearResultType();
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
        }
        $selected_poketypes.push($this);
        $this.addClass("selected");
    });

    $modeSwitchButton.on("click", function(e) {
        if (!isReverse) {
            $modeSwitchButton.text($modeSwitchButton.text().replace(/逆さ相性/g, "タイプ相性"));
            $title.text($title.text().replace(/タイプ相性/g, "逆さ相性"));
            isReverse = true;
        }
        else {
            $modeSwitchButton.text($modeSwitchButton.text().replace(/タイプ相性/g, "逆さ相性"));
            $title.text($title.text().replace(/逆さ相性/g, "タイプ相性"));
            isReverse = false;
        }
        // リセット
        pre_selected_poketype = null;
        clearSelectedType();
        clearResultType();
    });

    function clearSelectedType() {
        $.each($selected_poketypes, function(i, $elem) {
            $elem.removeClass("selected");
        });
        $selected_poketypes = [];
    }

    function setResultType(type) {
        $resultPoketype.text(poketypeNames[type]).attr("data-poketype", type);
    }

    function clearResultType() {
        $resultPoketype.text("").attr("data-poketype", -1);
    }

    function diagnosePoketype(defenseType1, defenseType2) {
        // console.log("diagnose:", poketypeNames[defenseType1], defenseType2 ? poketypeNames[defenseType2] : "");
        var attackType;
        for (attackType = 0; attackType < 18; attackType++) {
            if (computeEfficacy(attackType, defenseType1, defenseType2, isReverse) >= 2) {
                break;
            }
        }
        setResultType(attackType);
    }

    /**
     * 攻撃するときのタイプの相性(倍率)を計算します。
     * @param {number} attackType 攻撃する技のタイプ。
     * @param {number} defenseType1 防御するポケモンのタイプ。
     * @param {number} defenseType2 防御するポケモンのタイプ。
     * @param {boolean} isReverse 相性を逆さにするかどうか。
     */
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

    /**
     * タイプの相性(倍率)を逆さにします。
     * @param {number} efficacy 逆さにするタイプの相性(倍率)。
     */
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
})();
