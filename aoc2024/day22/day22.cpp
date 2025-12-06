#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>
#include <omp.h>
#include <cstdint>

// Constants
constexpr int PRUNE = 0xFFFFFF;
constexpr int NSTEPS = 2000;
constexpr int SEQ_LENGTH = 4;

// Function to transform number (equivalent to f() in original)
uint32_t transform(uint32_t num) {
    num = ((num << 6) ^ num) & PRUNE;
    num = ((num >> 5) ^ num) & PRUNE;
    num = ((num << 11) ^ num) & PRUNE;
    return num;
}

// Shift array left by one and return new value at end
void shift(int arr[SEQ_LENGTH]) {
    for (int i = 0; i < SEQ_LENGTH - 1; i++) {
        arr[i] = arr[i + 1];
    }
}

// Compare two arrays
bool compare(const int arr1[SEQ_LENGTH], const int arr2[SEQ_LENGTH]) {
    for (int i = 0; i < SEQ_LENGTH; i++) {
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

// Calculate value for a sequence and initial condition
int calculate_value(const int seq[SEQ_LENGTH], uint32_t ic) {
    int differences[SEQ_LENGTH] = {0};
    int ret = 0;

    for (int i = 0; i < NSTEPS; i++) {
        // Update differences array (equivalent to h() in original)
        shift(differences);
        uint32_t ic_new = transform(ic);
        differences[SEQ_LENGTH-1] = (ic_new % 10) - (ic % 10);
        ic = ic_new;

        // Check for sequence match after we have enough values
        if (i >= 3 && compare(differences, seq)) {
            ret += (ic % 10);
            break;
        }
    }

    return ret;
}

int main() {
    // Read input file
    std::vector<uint32_t> initial_conditions;
    std::ifstream infile("input.txt");
    uint32_t num;

    while (infile >> num) {
        initial_conditions.push_back(num);
    }
    std::cout<<initial_conditions.size()<<std::endl;

    // Set number of threads
    omp_set_num_threads(20);

    int max_result = 0;
    int progress_counter = 0;
    const int total_iterations = 19 * 19;

    // Parallel search through all possibilities
    #pragma omp parallel for collapse(4) schedule(dynamic) reduction(max:max_result)
    for (int a = -9; a <= 9; a++) {
        for (int b = -9; b <= 9; b++) {
            for (int c = -9; c <= 9; c++) {
                for (int d = -9; d <= 9; d++) {
                    int seq[SEQ_LENGTH] = {a, b, c, d};
                    int total = 0;

                    // Calculate sum for all initial conditions
                    for (uint32_t ic : initial_conditions) {
                        total += calculate_value(seq, ic);
                    }

                    max_result = std::max(max_result, total);
                }
            }
        }
        /*
        // Progress indication (outside parallel region)
        #pragma omp critical
        {
            progress_counter++;
            std::cout << (progress_counter * 100.0) / total_iterations << "% complete\r" << std::flush;
        }*/
    }

    std::cout << "\nFinal result: " << max_result << std::endl;
    return 0;
}
