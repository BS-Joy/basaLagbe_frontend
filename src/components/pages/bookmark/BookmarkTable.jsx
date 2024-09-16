import React from "react";

const BookmarkTable = () => {
  return (
    <table class="table w-full p-4 bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
            #
          </th>
          <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
            Ads
          </th>
          <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
            Available Form
          </th>
          <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
            rent
          </th>
          <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-gray-700">
          <td class="border-b-2 p-4 dark:border-dark-5">1</td>
          <td class="border-b-2 p-4 dark:border-dark-5">Jean Marc</td>
          <td class="border-b-2 p-4 dark:border-dark-5">Louis</td>
          <td class="border-b-2 p-4 dark:border-dark-5">Jl987</td>
        </tr>
        <tr class="text-gray-700">
          <td class="border-b-2 p-4 dark:border-dark-5">2</td>
          <td class="border-b-2 p-4 dark:border-dark-5">Eric</td>
          <td class="border-b-2 p-4 dark:border-dark-5">Prouve</td>
          <td class="border-b-2 p-4 dark:border-dark-5">prouveE</td>
        </tr>
        <tr class="text-gray-700">
          <td class="border-b-2 p-4 dark:border-dark-5">3</td>
          <td class="border-b-2 p-4 dark:border-dark-5">Julien</td>
          <td class="border-b-2 p-4 dark:border-dark-5">Clai</td>
          <td class="border-b-2 p-4 dark:border-dark-5">CJUL87</td>
        </tr>
        <tr class="text-gray-700">
          <td class="border-b-2 p-4 dark:border-dark-5">4</td>
          <td class="border-b-2 p-4 dark:border-dark-5">Igor</td>
          <td class="border-b-2 p-4 dark:border-dark-5">Louth</td>
          <td class="border-b-2 p-4 dark:border-dark-5">IGL89_9</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BookmarkTable;
