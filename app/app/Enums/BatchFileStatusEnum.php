<?php

namespace App\Enums;

enum BatchFileStatusEnum: int
{
    case Pending = 0;
    case Processing = 1;
    case Processed = 2;
    case Failed = 3;
}
