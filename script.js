var warship_directions = ["RIGHT", "DOWN", "LEFT", "UP"];
var warship_directions_index = 1;
var count = 0;

//var first_map;
//var second_map;
var maps;
var move_index;
var game_type;

var attacked = false;

if (localStorage.getItem('maps')) {
    maps = JSON.parse(localStorage.getItem('maps'));
    move_index = localStorage.getItem('move_index');
    game_type = localStorage.getItem('game_type');
} else {
    $('#continue_game').css('display', 'none');
    move_index = 0;
    maps = [{}, {}];
}


$('.warship').click((event) => {

    $('.warship').removeClass('selected');
    $(event.currentTarget).addClass('selected');
});

function selecting(target) {
    //let target = event.currentTarget;

    if ($('.warship.selected').length != 0) {
        let selected = $('.warship.selected')[0];

        let map = [];
        for (let i = 0; i < 10; i++) {
            let row = [];
            for (let j = 0; j < 10; j++) {
                let cell = $(`#${i}-${j}`)[0];
                row.push(cell);
            }
            map.push(row);
        }


        let direction = warship_directions[warship_directions_index];
        let length = $(selected).data('length');
        let rowId = parseInt(target.id.split('-')[0]);
        let colId = parseInt(target.id.split('-')[1]);

        let cells = [];
        let nearCells = [];

        switch (direction) {
            case "RIGHT":
                {



                    if (10 - colId >= length) {


                        for (let i = 0; i < length; i++) {
                            cells.push(`${rowId}-${colId+i}`)
                        }
                    } else {




                        for (let i = 0; i < length; i++) {
                            cells.unshift(`${rowId}-${9-i}`);
                        }

                    }

                    for (let i = 0; i < length; i++) {
                        if (rowId < 9)
                            nearCells.push(`${rowId+1}-${parseInt(cells[i].split('-')[1])}`);
                        if (rowId > 0)
                            nearCells.push(`${rowId-1}-${parseInt(cells[i].split('-')[1])}`);
                    }



                    if (cells[length - 1].split('-')[1] < 9) {
                        nearCells.push(`${rowId}-${parseInt(cells[length-1].split('-')[1])+1}`);
                    }
                    if (cells[length - 1].split('-')[1] > 0) {
                        nearCells.push(`${rowId}-${parseInt(cells[0].split('-')[1])-1}`);
                    }

                    if (rowId < 9) {
                        if (cells[length - 1].split('-')[1] < 9) {
                            nearCells.push(`${rowId+1}-${parseInt(cells[length-1].split('-')[1])+1}`);
                        }
                        if (cells[length - 1].split('-')[1] > 0) {
                            nearCells.push(`${rowId+1}-${parseInt(cells[0].split('-')[1])-1}`);
                        }
                    }
                    if (rowId > 0) {
                        if (cells[length - 1].split('-')[1] < 9)
                            nearCells.push(`${rowId-1}-${parseInt(cells[length-1].split('-')[1])+1}`);
                        if (cells[length - 1].split('-')[1] > 0)
                            nearCells.push(`${rowId-1}-${parseInt(cells[0].split('-')[1])-1}`);
                    }

                    break;
                }
            case "LEFT":
                {



                    if (1 + colId >= length) {


                        for (let i = 0; i < length; i++) {
                            cells.unshift(`${rowId}-${colId-i}`)
                        }
                    } else {



                        for (let i = 0; i < length; i++) {
                            cells.push(`${rowId}-${0+i}`)
                        }
                    }

                    for (let i = 0; i < length; i++) {
                        if (rowId < 9)
                            nearCells.push(`${rowId+1}-${parseInt(cells[i].split('-')[1])}`);
                        if (rowId > 0)
                            nearCells.push(`${rowId-1}-${parseInt(cells[i].split('-')[1])}`);
                    }



                    if (cells[length - 1].split('-')[1] < 9) {
                        nearCells.push(`${rowId}-${parseInt(cells[length-1].split('-')[1])+1}`);
                    }
                    if (cells[length - 1].split('-')[1] > 0) {
                        nearCells.push(`${rowId}-${parseInt(cells[0].split('-')[1])-1}`);
                    }

                    if (rowId < 9) {
                        if (cells[length - 1].split('-')[1] < 9) {
                            nearCells.push(`${rowId+1}-${parseInt(cells[length-1].split('-')[1])+1}`);
                        }
                        if (cells[length - 1].split('-')[1] > 0) {
                            nearCells.push(`${rowId+1}-${parseInt(cells[0].split('-')[1])-1}`);
                        }
                    }
                    if (rowId > 0) {
                        if (cells[length - 1].split('-')[1] < 9)
                            nearCells.push(`${rowId-1}-${parseInt(cells[length-1].split('-')[1])+1}`);
                        if (cells[length - 1].split('-')[1] > 0)
                            nearCells.push(`${rowId-1}-${parseInt(cells[0].split('-')[1])-1}`);
                    }

                    break;
                }
            case "DOWN":
                {

                    if (10 - rowId >= length) {


                        for (let i = 0; i < length; i++) {
                            cells.push(`${rowId+i}-${colId}`)
                        }
                    } else {



                        for (let i = 0; i < length; i++) {
                            cells.unshift(`${9-i}-${colId}`)
                        }
                    }

                    for (let i = 0; i < length; i++) {
                        if (colId < 9)
                            nearCells.push(`${parseInt(cells[i].split('-')[0])}-${colId+1}`);
                        if (colId > 0)
                            nearCells.push(`${parseInt(cells[i].split('-')[0])}-${colId-1}`);
                    }

                    if (cells[length - 1].split('-')[0] < 9) {
                        nearCells.push(`${parseInt(cells[length-1].split('-')[0])+1}-${colId}`);
                    }
                    if (cells[length - 1].split('-')[0] > 0) {
                        nearCells.push(`${parseInt(cells[0].split('-')[0])-1}-${colId}`);
                    }

                    if (colId < 9) {
                        if (cells[length - 1].split('-')[0] < 9) {
                            nearCells.push(`${parseInt(cells[length-1].split('-')[0])+1}-${colId+1}`);
                        }
                        if (cells[length - 1].split('-')[0] > 0) {
                            nearCells.push(`${parseInt(cells[0].split('-')[0])-1}-${colId+1}`);
                        }
                    }
                    if (colId > 0) {
                        if (cells[length - 1].split('-')[0] < 9)
                            nearCells.push(`${parseInt(cells[length-1].split('-')[0])+1}-${colId-1}`);
                        if (cells[length - 1].split('-')[0] > 0)
                            nearCells.push(`${parseInt(cells[0].split('-')[0])-1}-${colId-1}`);
                    }

                    break;
                }
            case "UP":
                {

                    if (1 + rowId >= length) {


                        for (let i = 0; i < length; i++) {
                            cells.unshift(`${rowId-i}-${colId}`)
                        }
                    } else {



                        for (let i = 0; i < length; i++) {
                            cells.push(`${0+i}-${colId}`)
                        }
                    }

                    for (let i = 0; i < length; i++) {
                        if (colId < 9)
                            nearCells.push(`${parseInt(cells[i].split('-')[0])}-${colId+1}`);
                        if (colId > 0)
                            nearCells.push(`${parseInt(cells[i].split('-')[0])}-${colId-1}`);
                    }

                    if (cells[length - 1].split('-')[0] < 9) {
                        nearCells.push(`${parseInt(cells[length-1].split('-')[0])+1}-${colId}`);
                    }
                    if (cells[length - 1].split('-')[0] > 0) {
                        nearCells.push(`${parseInt(cells[0].split('-')[0])-1}-${colId}`);
                    }

                    if (colId < 9) {
                        if (cells[length - 1].split('-')[0] < 9) {
                            nearCells.push(`${parseInt(cells[length-1].split('-')[0])+1}-${colId+1}`);
                        }
                        if (cells[length - 1].split('-')[0] > 0) {
                            nearCells.push(`${parseInt(cells[0].split('-')[0])-1}-${colId+1}`);
                        }
                    }
                    if (colId > 0) {
                        if (cells[length - 1].split('-')[0] < 9)
                            nearCells.push(`${parseInt(cells[length-1].split('-')[0])+1}-${colId-1}`);
                        if (cells[length - 1].split('-')[0] > 0)
                            nearCells.push(`${parseInt(cells[0].split('-')[0])-1}-${colId-1}`);
                    }

                    break;
                }
        }
        for (let i = 0; i < length; i++) {
            $(`#${cells[i]}`).addClass('selecting');
            $(`#${cells[i]}`).attr('data-warshipid', $(selected).data('warshipid'));
        }

        //$(cells).attr('data-warshipid',$(selected).data('warshipid'));

        for (let i = 0; i < nearCells.length; i++) {
            let cell = $(`#${nearCells[i]}`);
            if (!($(cell).hasClass('selected'))) {
                $(cell).addClass('pre_near_selected');
            }
        }

    }
}

$('.set_map .cell').mouseleave(() => {
    let cells = $('.cell');
    cells.removeClass('selecting');

    $(cells).each((index, cell) => {
        if (!$(cell).hasClass('selected'))
            $(cell).removeAttr('data-warshipid');
    });

    $('.pre_near_selected').removeClass('pre_near_selected');
});

$('.set_map .cell').mouseenter((event) => {
    selecting(event.currentTarget);
});

$('.set_map .cell').bind('mousewheel DOMMouseScroll', function(event) {
    if ($('.warship.selected').length != 0) {
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            if (warship_directions_index == 0) {
                warship_directions_index = 3;
            } else {
                warship_directions_index--;
            }
        } else {
            if (warship_directions_index == 3) {
                warship_directions_index = 0;
            } else {
                warship_directions_index++;
            }
        }
    }
    $('.cell').removeClass('selecting');
    $('.pre_near_selected').removeClass('pre_near_selected');
    selecting(event.currentTarget);
});

$('.set_map .cell').click((event) => {
    let cells = $('.set_map .map_table .selecting');
    let allCells = $('.cell');

    if (cells.length != 0) {

        let nearCells = $('.set_map .near_selected');
        let selected = $('.set_map .map_table .selected')


        for (let i = 0; i < cells.length; i++) {

            for (let j = 0; j < nearCells.length; j++) {
                if (nearCells[j].id == cells[i].id) {
                    return;
                }
            }
            for (let j = 0; j < selected.length; j++) {
                if (selected[j].id == cells[i].id) {
                    return;
                }
            }
        }

        $(cells).removeClass('selecting');
        $(cells).addClass('selected');


        let preNearCells = $('.pre_near_selected');

        $(preNearCells).removeClass('pre_near_selected');
        $(preNearCells).addClass('near_selected');

        let selectedWarship = $('.warships_port .selected');
        selectedWarship.removeClass('selected');
        selectedWarship.addClass('on_map');
    }
});

$('#set_map').click(() => {


    let cells = $('.set_map .map_table .selected');
    let warships = $('.set_map .warship');


    for (let i = 0; i < warships.length; i++) {
        if (!$(warships[i]).hasClass('on_map')) {
            return;
        }
    }

    let map = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = $(`.set_map #${i}-${j}`)[0];
            if ($(cell).hasClass('selected'))
                map.push(cell.id);
        }
    }




    $('.set_map .cell').removeClass('selected');
    $('.set_map .cell').removeClass('near_selected');
    $('.set_map .cell').removeAttr('data-warshipid');
    $('.warships_port .warship').removeClass('selected');
    $('.warships_port .warship').removeClass('on_map');

    if (!maps[0].selected) {
        maps[0] = {
            selected: map,
            attacked: [],
            destroyed: []
        }
        if (game_type == "pvi" || game_type == "ivi") {

            makeMap();
        }
    } else {
        maps[1] = {
            selected: map,
            attacked: [],
            destroyed: []
        }

        localStorage.setItem('maps', JSON.stringify([maps[0], maps[1]]));
        localStorage.setItem('move_index', move_index)
        localStorage.setItem('game_type', game_type)



        $('.set_map').hide();
        $('.game').css('display', 'flex');

        let first_map = maps[0];
        let second_map = maps[1];


        setMaps(first_map.attacked, first_map.destroyed, first_map.selected, second_map.attacked, second_map.destroyed);
        if (game_type == "ivi") {
            setTimeout(() => { makeAttack(); }, 100);
        }
    }
});


$('#new_game').click(() => {

    $('.game_type').css('display', 'flex');
    $('.menu_first_buttons').hide();

});

$('.game_type_btn').click((event) => {

    game_type = event.currentTarget.id;

    $('.game_type').hide();
    $('.menu_first_buttons').show();
    $('.menu').hide();
    $('.set_map').css('display', 'flex');
    localStorage.removeItem('maps');
    localStorage.removeItem('move_index');
    localStorage.removeItem('game_type');

    move_index = 0;
    maps = [{}, {}];

    $('.set_map .cell').removeClass('selected near_selected data-warshipid');
    $('.warships_port .warship').removeClass('selected on_map');

    if (game_type == "ivi") {
        makeMap();
    }
});

$('#continue_game').click(() => {
    $('.menu').hide();
    $('.set_map').hide();
    $('.game').css('display', 'flex');

    let first_map = maps[move_index];
    let second_map = maps[move_index == 0 ? 1 : 0];

    setMaps(first_map.attacked, first_map.destroyed, first_map.selected, second_map.attacked, second_map.destroyed);
    if (game_type == "ivi" || (game_type == "pvi" && move_index == 1)) {
        makeAttack();
    }
});

function setMaps(player_map_attacked, player_map_destroyed, player_map_selected, enemy_map_attacked, enemy_map_destroyed) {

    attacked = false;

    $(`.game .player_side .cell`).removeClass('selected attacked destroyed');
    $(`.game .enemy_side .cell`).removeClass('attacked destroyed');

    $('.game .player_side span#player_id').text('player ' + (parseInt(move_index) + 1));
    $('.game .enemy_side span#player_id').text('player ' + ((parseInt(move_index) == 1 ? 1 : 2)));



    $(player_map_attacked).each((index, cell) => {
        //
        $(`.game .player_side #${cell}.cell`).addClass('attacked');
    });
    $(player_map_destroyed).each((index, cell) => {
        //
        $(`.game .player_side #${cell}.cell`).addClass('destroyed');
    });
    $(player_map_selected).each((index, cell) => {
        //
        $(`.game .player_side #${cell}.cell`).addClass('selected');
    });

    $(enemy_map_attacked).each((index, cell) => {
        //
        $(`.game .enemy_side #${cell}.cell`).addClass('attacked');
    });
    $(enemy_map_destroyed).each((index, cell) => {
        //
        $(`.game .enemy_side #${cell}.cell`).addClass('destroyed');
    });

    let playerCells = $('.game .player_side .cell');
    let enemyCells = $('.game .enemy_side .cell');

    //
    //
}

function attack(cell) {
    console.log(move_index + " ATTACK");

    let cellId = cell.id;
    let enemyMap = maps[move_index == 1 ? 0 : 1];

    if (enemyMap.selected.includes(cellId) && !enemyMap.attacked.includes(cellId) && !enemyMap.destroyed.includes(cellId)) {


        maps[move_index == 1 ? 0 : 1].destroyed.push(cellId);
        $(cell).addClass("destroyed");

    } else if (!enemyMap.attacked.includes(cellId) && !enemyMap.destroyed.includes(cellId)) {


        maps[move_index == 1 ? 0 : 1].attacked.push(cellId);
        $(cell).addClass("attacked");
        attacked = true;
        $('.blur_maps').css('display', 'flex');
        move_index = move_index == 0 ? 1 : 0;
    } else {
        if (game_type == 'ivi' || (game_type == "pvi" && move_index == 1))
            makeAttack();
        return;
    }

    if (maps[move_index == 1 ? 0 : 1].selected.length == maps[move_index == 1 ? 0 : 1].destroyed.length) {
        $(`.game .player_side .winner`).css('display', 'block');
        $('.blur_maps').css('display', 'none');
        localStorage.removeItem('move_index');
        localStorage.removeItem('maps');
        localStorage.removeItem('game_type');
        maps = null;
        $('.go_to_menu').css('display', 'block');
        return;
    } else {
        localStorage.setItem('maps', JSON.stringify(maps));
        localStorage.setItem('move_index', move_index);
    }

    if (game_type == "ivi") {
        //$('#blur_maps_btn').click();
        $('#next_maps_btn').click();

        //setTimeout(() => {
        makeAttack();
        //}, 0);
    } else if (game_type == "pvi") {
        $('#blur_maps_btn').click();
        $('#next_maps_btn').click();
        if (move_index == 1) {
            makeAttack();
        }
    }
}

$('.game .enemy_side .cell').click((event) => {


    if (!$(event.currentTarget).hasClass('attacked') && !$(event.currentTarget).hasClass('destroyed') && !attacked && maps) {

        attack(event.currentTarget);
    }
});

$('#blur_maps_btn').click(() => {
    $('.next_maps').css('display', 'flex');
    $('.game').hide();
});

$('#next_maps_btn').click(() => {
    $('.blur_maps').hide();
    $('.next_maps').hide();
    $('.game').css('display', 'flex');


    let first_map = maps[move_index];
    let second_map = maps[move_index == 0 ? 1 : 0];

    setMaps(first_map.attacked, first_map.destroyed, first_map.selected, second_map.attacked, second_map.destroyed);
});

$('#go_to_menu_btn').click(() => {
    $('.game').hide();
    $('.menu').css('display', 'flex');
    $('#continue_game').css('display', 'none');
});


function makeMap() {
    let count = 0;
    while (true) {
        let warships = $('.set_map .warship');
        let warshipsOnMap = $('.set_map .warship.on_map');

        if (warships.length == warshipsOnMap.length) {
            break;
        }

        let warship;
        for (let i = 0; i < warships.length; i++) {
            if (!$(warships[i]).hasClass('on_map')) {
                warship = warships[i];
                break;
            }
        }

        warship.click();

        let randDirection = Math.floor(Math.random() * 4);

        warship_directions_index = randDirection;

        let cells = $('.set_map .cell');
        let freeCells = cells.filter(c => !$(c).hasClass('selected') && !$(c).hasClass('near_selected'));

        let randCell = Math.floor(Math.random() * freeCells.length);
        // 
        // 
        // 
        // 
        selecting(freeCells[randCell])
        freeCells[randCell].click();

        let allCells = $('.cell');
        cells.removeClass('selecting');

        $(allCells).each((index, cell) => {
            if (!$(allCells).hasClass('selected'))
                $(allCells).removeAttr('data-warshipid');
        });

        $('.pre_near_selected').removeClass('pre_near_selected');

        count++;

    }
    if (game_type == 'ivi' || (game_type == "pvi" && maps[0].selected))
        $('#set_map').click();
}

function makeAttack() {
    console.log("ATTACK!");
    let cells = $('.game .enemy_side .cell');
    let enemyMap = maps[move_index == 1 ? 0 : 1];
    console.log(enemyMap.attacked, enemyMap.destroyed);

    let notAttckedCells = [];
    // = cells.filter(c => {
    //     //return !enemyMap.attacked.includes(c.id) && !enemyMap.destroyed.includes(c.id);
    //     return !$(c).hasClass('attacked') && !$(c).hasClass('destroyed');
    // });

    $(cells).each((index, cell) => {
        if (!$(cell).hasClass('attacked') && !$(cell).hasClass('destroyed'))
            notAttckedCells.push(cell);
    });

    console.log(notAttckedCells, move_index);
    let randCell = Math.floor(Math.random() * notAttckedCells.length);
    console.log(notAttckedCells[randCell]);
    console.log("CELL HAS CLASS: " + ($(notAttckedCells[randCell]).hasClass('attacked') || $(notAttckedCells[randCell]).hasClass('destroyed')));


    //alert("ASDASD");
    if (game_type == 'ivi')
        setTimeout(() => {
            attack(notAttckedCells[randCell]);
        }, 1);
    else
        attack(notAttckedCells[randCell]);

    console.log(count += 1);
}

$('#random_map_btn').click(() => {
    $('.set_map .cell').removeClass('selected');
    $('.set_map .cell').removeClass('near_selected');
    $('.set_map .cell').removeAttr('data-warshipid');
    $('.warships_port .warship').removeClass('selected');
    $('.warships_port .warship').removeClass('on_map');
    makeMap();
});