import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300 

function filterByPtbc(ptbc) {
    $('[wm-ptbc]').each(function(i,e) {
        const isTarget = $(this).attr('wm-ptbc') === ptbc
            || ptbc === null
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.ptbcButtons = function () {
    const ptsbc = new Set
    $('[wm-ptbc]').each(function(i, e) {
        ptsbc.add($(e).attr('wm-ptbc'))
    })

    const btns = Array.from(ptsbc).map(ptbc => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(ptbc)
        btn.click(e => filterByPtbc(ptbc))
        return btn
    })
    
    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(e => filterByPtbc(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-ptbc-buttons]').ptbcButtons()
})

