import subprocess
import argparse

GREEN = "\033[92m"
RESET = "\033[0m"

def run_command(command, description, verbose):
    print(f"Running: {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, text=True, stdout=None if verbose else subprocess.PIPE, stderr=subprocess.PIPE)
        if verbose:
            print(result.stdout)
        print(f"Success: {description}")
        return True
    except subprocess.CalledProcessError as e:
        if not verbose:
            print(e.stderr)
        print(f"Failed: {description}\nError: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Run yarn pipeline commands.")
    parser.add_argument('-v', '--verbose', action='store_true', help="Increase output verbosity")
    args = parser.parse_args()

    commands = [
        ("yarn install", "Yarn Install"),
        ("yarn format:check", "Yarn Format Check"),
        ("yarn lint", "Yarn Lint"),
        ("yarn frontend test --run", "Yarn Frontend Test"),
        ("yarn frontend build", "Yarn Frontend Build"),
        ("yarn backend build", "Yarn Backend Build"),
    ]
    
    for command, description in commands:
        if not run_command(command, description, args.verbose):
            print("Stopping due to failure.")
            break
    else:
        print(f"{GREEN}Pipeline run successful.{RESET}")

if __name__ == "__main__":
    main()
