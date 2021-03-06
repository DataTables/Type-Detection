const fs = require('fs');
tokens = {
    month: [
        'M',
        'MM',
        'MMM',
        'MMMM'
    ],
    dayOfMonth: [
        'D',
        'Do',
        'DD'
    ],
    dayOfWeek: [
        'dd',
        'ddd',
        'dddd'
    ],
    year: [
        'YY',
        'YYYY'
    ],
    amPm: [
        'A',
        'a'
    ],
    hour: [
        'H',
        'HH'
    ],
    minute: [
        'm',
        'mm'
    ],
    second: [
        's',
        'ss'
    ]
}

separators = [
    '-',
    '/',
    ' '
]

var formats = [];
var times = [];

for (var a = 0; a < separators.length; a++) {
    var separator = separators[a];

    for(var b = 0; b < tokens.month.length; b++) {
        var month = tokens.month[b];

        for(var c = 0; c < tokens.dayOfMonth.length; c++) {
            var dayOfMonth = tokens.dayOfMonth[c];
            if(dayOfMonth === 'Do' && separator !== ' ') {
                continue;
            }
    
            for(var d = 0; d < tokens.year.length; d++) {
                var year = tokens.year[d];
                console.log(month, "#" + separator+"#")
                if(separator === ' ' && (month === 'MMM' || month === 'MMMM')) {
                    console.log("first")
                    formats.push(month + separator + dayOfMonth + "," + separator + year);
                    continue;
                }
                else if((month === 'MMM' || month === 'MMMM' || dayOfMonth === 'Do') && separator !== ' ') {
                    console.log("second")
                    continue;
                }
                else {
                    console.log("third")
                    formats.push(month + separator + dayOfMonth + separator + year);
                }
            }
        }   
    }
}

for (var a = 0; a < separators.length; a++) {
    var separator = separators[a];

    for(var b = 0; b < tokens.dayOfMonth.length; b++) {
        var dayOfMonth = tokens.dayOfMonth[b];

        for(var c = 0; c < tokens.month.length; c++) {
            var month = tokens.month[c];
    
            for(var d = 0; d < tokens.year.length; d++) {
                var year = tokens.year[d];
                if(separator === ' ' && (month === 'MMM' || month === 'MMMM')) {
                    formats.push(dayOfMonth + separator + month + "," + separator + year);
                    continue;
                }
                else if((month === 'MMM' || month === 'MMMM' || dayOfMonth === 'Do') && separator !== ' ') {
                    continue;
                }
                else {
                    formats.push(dayOfMonth + separator + month + separator + year);
                }
            }
        }   
    }
}

for (var a = 0; a < separators.length; a++) {
    var separator = separators[a];

    for(var b = 0; b < tokens.year.length; b++) {
        var year = tokens.year[b];

        for(var c = 0; c < tokens.month.length; c++) {
            var month = tokens.month[c];
    
            for(var d = 0; d < tokens.dayOfMonth.length; d++) {
                var dayOfMonth = tokens.dayOfMonth[d];
                if(separator === ' ' && (month === 'MMM' || month === 'MMMM')) {
                    formats.push(year + "," + separator + month + separator + dayOfMonth);
                    continue;
                }
                else if((month === 'MMM' || month === 'MMMM' || dayOfMonth === 'Do') && separator !== ' ') {
                    continue;
                }
                else {
                    formats.push(year + separator + month + separator + dayOfMonth);
                }
            }
        }   
    }
}

for (var a = 0; a < tokens.hour.length; a++) {
    var hour = tokens.hour[a];
    for (var b = 0; b < tokens.minute.length; b++) {
        var minute = tokens.minute[b]
        times.push(hour + ":" + minute);
        if(hour !== 'HH') {
            for(var d = 0; d < tokens.amPm.length; d ++) {
                var amPm = tokens.amPm[d];
                times.push(hour + ":" + minute + " " + amPm)
            }
        }
        for(var c = 0; c < tokens.second.length; c++) {
            var second = tokens.second[c];
            times.push(hour + ":" + minute + ":" + second)
            if(hour !== 'HH') {
                for(var d = 0; d < tokens.amPm.length; d ++) {
                    var amPm = tokens.amPm[d];
                    times.push(hour + ":" + minute + ":" + second + " " + amPm)
                }
            }
        }
    }
}

finalFormats = {
    noTime: {
        '-': {
            stdMonth:{
                longYear: {
                    shortDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    },
                    longDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    }
                },
                shortYear: {
                    shortDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    },
                    longDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    }
                }
            },
            shortMonth:{
                longYear: {
                    shortDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    },
                    longDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    }
                },
                shortYear: {
                    shortDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    },
                    longDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    }
                }
            }
        },
        '/': {
            stdMonth:{
                longYear: {
                    shortDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    },
                    longDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    }
                },
                shortYear: {
                    shortDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    },
                    longDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    }
                }
            },
            shortMonth:{
                longYear: {
                    shortDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    },
                    longDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    }
                },
                shortYear: {
                    shortDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    },
                    longDay:{
                        dmy:[],
                        mdy:[],
                        ymd:[]
                    }
                }
            }
        },
        '_': {
            comma: {
                longMonth:{
                    longYear: {
                        shortDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        longDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        postDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        }
                    },
                    shortYear: {
                        shortDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        longDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        postDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        }
                    }
                },
                abbrMonth:{
                    longYear: {
                        shortDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        longDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        postDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        }
                    },
                    shortYear: {
                        shortDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        longDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        postDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        }
                    }
                }
            },
            noComma: {
                stdMonth:{
                    longYear: {
                        shortDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        longDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        postDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        }
                    },
                    shortYear: {
                        shortDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        longDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        postDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        }
                    }
                },
                shortMonth:{
                    longYear: {
                        shortDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        longDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        postDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        }
                    },
                    shortYear: {
                        shortDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        longDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        },
                        postDay:{
                            dmy:[],
                            mdy:[],
                            ymd:[]
                        }
                    }
                }
            }
        }
    },
    onlyTime: {
        longHour:{
            longMinute:{
                longSeconds: [],
                shortSeconds: [],
                noSeconds: []
            },
            shortMinute:{
                longSeconds: [],
                shortSeconds: [],
                noSeconds: []
            }   
        },
        shortHour:{
            ampm: {
                longMinute:{
                    longSeconds: [],
                    shortSeconds: [],
                    noSeconds: []
                },
                shortMinute:{
                    longSeconds: [],
                    shortSeconds: [],
                    noSeconds: []
                }   
            },
            AMPM: {
                longMinute:{
                    longSeconds: [],
                    shortSeconds: [],
                    noSeconds: []
                },
                shortMinute:{
                    longSeconds: [],
                    shortSeconds: [],
                    noSeconds: []
                } 
            },
            noAmPm: {
                longMinute:{
                    longSeconds: [],
                    shortSeconds: [],
                    noSeconds: []
                },
                shortMinute:{
                    longSeconds: [],
                    shortSeconds: [],
                    noSeconds: []
                } 
            }
        }
    },
    time: {
        longHour:{
            longMinute:{
                longSeconds: {
                    '-': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '/': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '_': {
                        comma: {
                            longMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            abbrMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        noComma: {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        }
                    }
                },
                shortSeconds: {
                    '-': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '/': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '_': {
                        comma: {
                            longMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            abbrMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        noComma: {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        }
                    }
                },
                noSeconds: {
                    '-': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '/': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '_': {
                        comma: {
                            longMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            abbrMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        noComma: {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            shortMinute:{
                longSeconds: {
                    '-': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '/': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '_': {
                        comma: {
                            longMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            abbrMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        noComma: {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        }
                    }
                },
                shortSeconds: {
                    '-': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '/': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '_': {
                        comma: {
                            longMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            abbrMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        noComma: {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        }
                    }
                },
                noSeconds: {
                    '-': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '/': {
                        stdMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        },
                        shortMonth:{
                            longYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            },
                            shortYear: {
                                shortDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                },
                                longDay:{
                                    dmy:[],
                                    mdy:[],
                                    ymd:[]
                                }
                            }
                        }
                    },
                    '_': {
                        comma: {
                            longMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            abbrMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        noComma: {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    postDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        }
                    }
                }
            }   
        },
        shortHour:{
            ampm: {
                longMinute:{
                    longSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    shortSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    noSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                shortMinute:{
                    longSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    shortSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    noSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }   
            },
            AMPM: {
                longMinute:{
                    longSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    shortSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    noSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                shortMinute:{
                    longSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    shortSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    noSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    }
                } 
            },
            noAmPm: {
                longMinute:{
                    longSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    shortSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    noSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                shortMinute:{
                    longSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    shortSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    noSeconds: {
                        '-': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '/': {
                            stdMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            },
                            shortMonth:{
                                longYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                },
                                shortYear: {
                                    shortDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    },
                                    longDay:{
                                        dmy:[],
                                        mdy:[],
                                        ymd:[]
                                    }
                                }
                            }
                        },
                        '_': {
                            comma: {
                                longMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                abbrMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            },
                            noComma: {
                                stdMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                },
                                shortMonth:{
                                    longYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    },
                                    shortYear: {
                                        shortDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        longDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        },
                                        postDay:{
                                            dmy:[],
                                            mdy:[],
                                            ymd:[]
                                        }
                                    }
                                }
                            }
                        }
                    }
                } 
            }
        }
    }
}

var formatCopy = formats.slice();
for(var a = 0; a < formatCopy.length; a++) {
    for(var b = 0; b < times.length; b++){
        formats.push(formatCopy[a] + " " + times[b])
        formats.push(formatCopy[a] + ", " + times[b])
    }
} 

for(var a = 0; a < formats.length; a++) {
    var month = "shortMonth";
    if(formats[a].indexOf("MMMM")!== -1) {
        month = "longMonth";
    }
    else if(formats[a].indexOf("MMM")!== -1) {
        month = "abbrMonth";
    }
    else if(formats[a].indexOf("MM")!== -1) {
        month = "stdMonth"
    }
    
    var year = "shortYear";
    if(formats[a].indexOf("YYYY")!== -1) {
        year = "longYear";
    }

    var day = "shortDay";
    if(formats[a].indexOf("DD")!== -1) {
        day = "longDay";
    }
    else if(formats[a].indexOf("Do")!== -1) {
        day = "postDay";
    }

    var order = "dmy"
    if(formats[a].indexOf("M") === 0) {
        order = "mdy";
    }
    else if(formats[a].indexOf("Y") === 0) {
        order = "ymd"
    }
    
    var time = "noTime";
    var colIndex = formats[a].indexOf(":");
    if(colIndex !== -1) {
        time = "time"
        var ampm = "noAmPm"
        if(formats[a].indexOf("A") !== -1){
            ampm = "AMPM";
        }
        else if(formats[a].indexOf("a") !== -1){
            ampm = "ampm"
        }

        var hour = "shortHour";
        if(formats[a].indexOf("HH") !== -1) {
            hour = "longHour";
        }

        var minute = "shortMinute";
        if(formats[a].indexOf("mm") !== -1) {
            minute = "longMinute";
        }

        var seconds = "noSeconds";
        if(formats[a].indexOf("ss") !== -1){
            seconds = "longSeconds";
        }
        else if (formats[a].indexOf("s") !== -1) {
            seconds = "shortSeconds";
        }

        var separator = "_";
        if(formats[a].indexOf("-") !== -1) {
            separator = "-";
        }
        else if(formats[a].indexOf("/") !== -1) {
            separator = "/";
        }
        
        if(separator === "_") {
            var comma = "noComma";

            if(formats[a].indexOf(",")!== -1){
                comma = "comma";
            }

            console.log(time, hour, ampm, minute, seconds, separator, comma, month, year, day, order)
            if(hour === "longHour") {
                finalFormats[time][hour][minute][seconds][separator][comma][month][year][day][order].push(formats[a]);
            }
            else {
                finalFormats[time][hour][ampm][minute][seconds][separator][comma][month][year][day][order].push(formats[a]);
            }
        }
        else {
            if(hour === "longHour") {
                finalFormats[time][hour][minute][seconds][separator][month][year][day][order].push(formats[a]);
            }
            else {
                finalFormats[time][hour][ampm][minute][seconds][separator][month][year][day][order].push(formats[a]);
            }
        }
    }
    else {
        var separator = "_";
        if(formats[a].indexOf("-") !== -1) {
            separator = "-";
        }
        else if(formats[a].indexOf("/") !== -1) {
            separator = "/";
        }
        
        if(separator === "_") {
            var comma = "noComma";
            
            if(formats[a].indexOf(",") !== -1){
                comma = "comma";
            }
            console.log(formats[a], separator, comma)

            finalFormats[time][separator][comma][month][year][day][order].push(formats[a]);
        }
        else {
            finalFormats[time][separator][month][year][day][order].push(formats[a]);
        }
    }
}

time = "onlyTime";
for(var a = 0; a < times.length; a++) {
    var ampm = "noAmPm"
    if(times[a].indexOf("A") !== -1){
        ampm = "AMPM";
    }
    else if(times[a].indexOf("a") !== -1){
        ampm = "ampm"
    }

    var hour = "shortHour";
    if(times[a].indexOf("HH") !== -1) {
        hour = "longHour";
    }

    var minute = "shortMinute";
    if(times[a].indexOf("mm") !== -1) {
        minute = "longMinute";
    }

    var seconds = "noSeconds";
    if(times[a].indexOf("ss") !== -1){
        seconds = "longSeconds";
    }
    else if (times[a].indexOf("s") !== -1) {
        seconds = "shortSeconds";
    }

    console.log(time, hour, ampm, minute, seconds)
    if(hour === "longHour") {
        finalFormats[time][hour][minute][seconds].push(times[a]);
    }
    else {
        finalFormats[time][hour][ampm][minute][seconds].push(times[a]);
    }
}
fs.writeFileSync('resources/momentFormats.json', JSON.stringify(finalFormats, null, '\t'));