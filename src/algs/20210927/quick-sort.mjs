/** 交换数组中i,j两个索引位置的元素 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/** 💡️ quickSort排序算法模版，递归版，splice + concat */
export function quickSortOutOfPlace(nums) {
  const len = nums.length;
  if (len <= 1) {
    return nums;
  }

  const pivotIndex = Math.floor(len / 2);
  const pivot = nums.splice(pivotIndex, 1)[0];

  const low = [];
  const high = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < pivot) {
      low.push(nums[i]);
    } else {
      high.push(nums[i]);
    }
  }

  return [...quickSort(low), pivot, ...quickSort(high)];
}

/**
 * quickSort排序算法模版，递归版，原地排序
 * [用 JavaScript 实现快速排序](https://segmentfault.com/a/1190000037611587)
 */
export function quickSort(nums, start, end) {
  // start = start || 0; // ? 这样写为什么有问题

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = nums.length - 1;
  }

  if (start >= end) {
    return;
  }

  const pivotIndex = partition(nums, start, end);

  quickSort(nums, start, pivotIndex - 1);
  quickSort(nums, pivotIndex + 1, end);

  return nums;
}

/**
 * 重新排列数组的元素，使得基准值左侧的有元素都<基准值，而右侧的所有元素都>=基准值。
 * 这一步称为分区。
 */
function partition(nums, start, end) {
  // 每次分区都以最后一个元素作为基准值，最后一个元素就固定在最后，在遍历时不参与交换了
  const pivot = nums[end];

  // 用来确定将数组分为2部分时基准值对应的索引
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (nums[i] < pivot) {
      swap(nums, i, pivotIndex);
      pivotIndex++;
    }
  }

  // 将固定在末尾的基准值交换到两部分序列中间的基准位置
  swap(nums, pivotIndex, end);

  return pivotIndex;
}

/**
 * 三路排序算法把排序的数据分为三部分，分别为小于 v，等于 v，大于 v;
 * 对处理大量重复元素的数组非常有效
 */
export function quickSort3Way(nums, start, end) {
  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = nums.length - 1;
  }

  if (start >= end) {
    return;
  }

  const [left, right] = partition3Way(nums, start, end);

  quickSort(nums, start, left - 1);
  quickSort(nums, right + 1, end);

  return nums;
}

function partition3Way(nums, start, end) {
  // 每次分区都以最后一个元素作为基准值，最后一个元素就固定在最后，在遍历时不参与交换了
  const pivot = nums[start];

  let left = start;
  let right = end;

  // 用来确定将数组分为3部分时，小于pivot和等于pivot元素的总数
  let cur = start;

  while (cur <= right) {
    if (nums[cur] < pivot) {
      swap(nums, left, cur);
      left++;
      cur++;
    } else if (nums[cur] > pivot) {
      swap(nums, cur, right);
      right--;
    } else {
      cur++;
    }
  }

  return [left, right];
}
